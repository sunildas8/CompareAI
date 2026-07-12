import { StateSchema, type GraphNode, StateGraph, START, END,  } from "@langchain/langgraph";
import { mistralModel, cohereModel, geminiModel } from "./models.service.js";
import { createAgent, providerStrategy, HumanMessage} from "langchain"
import { z } from "zod";


const State = new StateSchema({
    problem: z.string().default(""),
    solution_1: z.string().default(""),
    solution_2: z.string().default(""),
    jude_recommendation: z.object({
        solution_1_score: z.number().default(0),
        solution_2_score: z.number().default(0),
        solution_1_reasoning: z.string().default(""),
        solution_2_reasoning: z.string().default("")
    })
});

const solutionNode: GraphNode<typeof State> = async (state: typeof State) => {

    const [mistral_solution, cohere_solution] = await Promise.all([
        mistralModel.invoke(state.problem),
        cohereModel.invoke(state.problem)
    ])
    return {
        solution_1: mistral_solution.text,
        solution_2: cohere_solution.text
    }
}

const judgeNode: GraphNode<typeof State> = async (state: typeof State) => {

    const { problem, solution_1, solution_2 } = state;
    
    const judge = createAgent({
        model: geminiModel,
        responseFormat:providerStrategy(z.object({
            solution_1_score: z.number().min(0).max(10),
            solution_2_score: z.number().min(0).max(10),
            solution_1_reasoning: z.string(),
            solution_2_reasoning: z.string()
        })),
        systemPrompt: `You are a judge. You will be given two solutions to a problem. Please evaluate the solutions and provide a score for each solution on a scale of 0 to 10, where 0 is the worst and 10 is the best. The solutions are as follows: Solution 1: ${solution_1}Solution 2: ${solution_2}Please provide your scores in the following format:  "solution_1_score": <score_for_solution_1>, "solution_2_score": <score_for_solution_2>`,
    })

    const judgeResponse = await judge.invoke({
        messages: [
            new HumanMessage(`
                Problem: ${problem},
                Solution 1: ${solution_1},
                Solution 2: ${solution_2},
                Please evaluate the solutions and provide your scores and reasoning for each solution.
            `)
        ]
    })

    const {
        solution_1_score,
        solution_2_score,
        solution_1_reasoning,
        solution_2_reasoning
    } = judgeResponse.structuredResponse;

    return {
        jude_recommendation: {
            solution_1_score,
            solution_2_score,
            solution_1_reasoning,
            solution_2_reasoning
        }
    }
}

const graph = new StateGraph(State)
    .addNode("solution", solutionNode)
    .addNode("judge", judgeNode)
    .addEdge(START, "solution")
    .addEdge("solution", "judge")
    .addEdge("judge", END)
    .compile();

export default async function useGraph(problem: string) {
    const result = await graph.invoke({
        problem: problem
    })

    console.log(result);
    return result;
}