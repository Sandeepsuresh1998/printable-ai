import { useState, FormEvent, ChangeEvent } from 'react';


// interface ImageData {
//     revised_prompt: string;
//     url: string;
//   }
  
//   interface DalleResponse {
//     created: number;
//     data: ImageData[];
//   }

/**
 * TODOs:
 * Style the landing page to work with this component give a fixed image size
 * Replace the Image component with an actual image component
 * Create a loading component for when the image is loading
 * Create a way to be able to upscale the image even more
 * 
 */

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    setImageUrl('');

    try {
      console.log(prompt)
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            prompt: prompt,
         }),
      });

      if (!response.ok) {
        throw new Error('Image generation failed');
      }

      const {data} = await response.json();
      console.log(data)
      console.log(data.data[0].url)
      setImageUrl(data.data[0].url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={prompt} onChange={handleChange} placeholder="Enter your prompt" />
        <button type="submit" disabled={isLoading}>Generate Image</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {imageUrl && <img src={imageUrl} alt="Generated" />}
      {error && <p>Error: {error}</p>} 
    </div>
  );
};

export default ImageGenerator;
