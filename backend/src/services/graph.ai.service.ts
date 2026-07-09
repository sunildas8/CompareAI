import { HumanMessage } from "@langchain/core/messages";
import { StateSchema, MessagesValue,ReducedValue, type GraphNode, StateGraph, START, END,  } from "@langchain/langgraph";
import { mistralModel, cohereModel, geminiModel } from "./models.service.js";
import { createAgent, providerStrategy} from "langchain"
import { z } from "zod";


const State = new StateSchema({
    messages: MessagesValue,
    solution_1: new ReducedValue(z.string().default(""), {
        reducer: (current, next) => {
            return next;
        }
    }),
    solution_2: new ReducedValue(z.string().default(""), {
        reducer: (current, next) => {
            return next;
        }
    }),
    jude_recommendation: new ReducedValue(z.object({
        solution_1_score: z.number(),
        solution_2_score: z.number(),
    }).default({
        solution_1_score: 0,
        solution_2_score: 0,
    }),
        {
            reducer: (current, next) => {
                return next;
            }
        }
    
    )
});

const solutionNode: GraphNode<typeof State> = async (state: typeof State) => {

    const [mistral_solution, cohere_solution] = await Promise.all([
        mistralModel.invoke(state.messages[0].text),
        cohereModel.invoke(state.messages[0].text)
    ])
    return {
        solution_1: mistral_solution.text,
        solution_2: cohere_solution.text
    }
}

const judgeNode: GraphNode<typeof State> = async (state: typeof State) => {

    const { solution_1, solution_2 } = state;
    
    const judge = createAgent({
        model: geminiModel,
        tools: [],
        responseFormat: z.object({
            solution_1_score: z.number().min(0).max(10),
            solution_2_score: z.number().min(0).max(10)
        })
    })

    const judgeResponse = await judge.invoke({
        messages: [
            new HumanMessage(`You are a judge. You will be given two solutions to a problem. Please evaluate the solutions and provide a score for each solution on a scale of 0 to 10, where 0 is the worst and 10 is the best. The solutions are as follows: Solution 1: ${solution_1}Solution 2: ${solution_2}Please provide your scores in the following format:  "solution_1_score": <score_for_solution_1>, "solution_2_score": <score_for_solution_2>}`)
        ]
    })

    const result = judgeResponse.structuredResponse;

    return {
        jude_recommendation: result
    }
}

const graph = new StateGraph(State)
    .addNode("solution", solutionNode)
    .addNode("judge", judgeNode)
    .addEdge(START, "solution")
    .addEdge("solution", "judge")
    .addEdge("judge", END)
    .compile();

export default async function (userMessage: string) {
    const result = await graph.invoke({
        messages: [
            new HumanMessage(userMessage)
        ]
    })

    console.log(result);
    return result.messages;
}