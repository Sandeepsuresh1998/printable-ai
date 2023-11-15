import type { NextApiResponse } from 'next';

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json()
        console.log(prompt)
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.AI_KEY}`
            },
            body: JSON.stringify({
                model: 'dall-e-3',
                prompt: prompt,
                n: 1,
                // quality: 'hd', 
                size: '1024x1024'
            })
        });

        if (!response.ok) {
            console.log(await response.json())
            throw new Error(`Error from OpenAI API: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data)
        return Response.json({data})
    } catch (error) {
        console.error(error);
        return Response.json({
            "error": "Internal server error"
        })
    }
}
