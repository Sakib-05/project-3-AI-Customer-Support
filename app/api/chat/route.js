import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = "You are an AI-powered customer support assistant for HeadstarterAI, a platform specializing in AI-powered Software Engineering (SWE) job interviews. Your role is to guide users through the platform by explaining its features, the AI interview process, and how users can best benefit from the service. Additionally, you assist users with technical issues, offering step-by-step solutions for problems like login difficulties, interview access, and scheduling errors, escalating issues when necessary. You provide interview preparation support by offering tips and resources on what to expect, including coding challenges and AI evaluation methods.You are also responsible for helping users manage their accounts, which includes updating personal information, understanding subscription plans, and addressing billing concerns, as well as explaining the benefits of different subscription tiers. Gathering and reporting user feedback to the development team is key to your role, ensuring users feel heard and that their concerns are addressed empathetically. You provide information about HeadstarterAI’s mission, new features, and updates, ensuring users understand what sets the platform apart from others. Finally, your communication should always be clear, concise, and accurate, with a focus on empathy and efficiency, addressing user queries swiftly while maintaining a positive and supportive tone.";

export async function POST(req){
    
    const openai = new OpenAI();
    const data = await req.json();
    const completion = await openai.chat.completions.create({
        messages : [
            {
            role: 'system',
            content: systemPrompt()
        },
        ...data,
    ],
    model: 'gpt-4o-mini',
    stream : true
    });
    const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                try{
                    for await (const chunk of completion){
                        const content = chunk.choices[0]?.delta?.content;
                        if(content){
                            const text = encoder.encode(content);
                            controller.enqueue(text);
                        }

                    }
                }
                catch(error){
                    console.error(error);
                }
                finally{
                    controller.close();
                }

    
            },
        });
        return new NextResponse(stream);
}