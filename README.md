# Boid Art

This is a text2img demonstration originally created as an experience for a Netlight x TUM Incubator event in Munich. It let's users create AI powered art by inputting prompts while also providing a foto wall of all images created throughout the event.

This project utilized [Stable-Diffusion on Replicate](https://replicate.com/stability-ai/stable-diffusion) to generate images.

## TODO

- [ ] Design Generation
- [ ] Design results
- [ ] What should results display?
- [ ] Maybe only get the latest n images?
- [ ] Have something like events? to distinguish which event images belong to and if generation is currently allowed.
- [ ] Handle error from Replicate. The `.error` will have a value explaining what happened, like NSFW detection.

## Development

### Config

First, you need to configure a `.env.local` with all required variables. You can copy `.env.example` to get started.

- **REPLICATE_TOKEN** is your API token for replicate to call their stable-diffusion API.
- **SERVICE_ACCOUNT** service account JSON for Firebase.

### Local

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Under the hood

### Techstack

- NextJS 13
- Tailwind
- Vercel
- Firebase
- Replicate
- Tap
