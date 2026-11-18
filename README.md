# Lumen — AI-Powered Interactive Whiteboard Tutor

**Official technical assignment — Braynix Studios**

## Product

Lumen is a chat-first learning experience that turns a topic into a short, visual lesson. The demo focuses on the moment of understanding: the learner can listen to a narrated lesson, watch the whiteboard draw each concept, pause or seek through the explanation, and ask follow-up questions without leaving the lesson.

### What is included

- Chat-first topic composer that asks the server to generate a fresh lesson.
- Synchronized 2-minute whiteboard lesson with play, pause, resume, restart, seek, next-step, speed, and voice controls.
- Canvas-rendered diagrams that update at lesson beats, plus learner pen and eraser tools.
- Follow-up tutor chat backed by the same server-side AI route.
- Responsive layout for desktop and mobile, with no API keys required for the demo.

## Run locally

Requires Node.js 18+.

```bash
npm start
```

Then open `http://localhost:3000`.

The browser's built-in speech synthesis is used for narration, so audio starts only after the learner presses Play. The server includes live AI routes for lesson generation (`POST /api/lesson`) and follow-up questions (`POST /api/ask`). Set `OPENAI_API_KEY` on the host to enable live generation; without it, a clearly labelled deterministic fallback keeps the full interaction explorable without credentials. The key is read only on the server and is never sent to the browser.

```bash
# Optional: enable live AI generation
$env:OPENAI_API_KEY="your-key"
npm start
```

## Deployment

This is a static browser app with one small Node server. It can be deployed to Render, Railway, Fly.io, or any Node-compatible host. Set the start command to `npm start` and expose the assigned `PORT` environment variable. It can also be hosted as static files if the server is replaced with the platform's static hosting configuration.

Thank you for your interest in Braynix Studios. This assignment is an opportunity to demonstrate how you think, explore a problem, make product and engineering decisions, and turn an idea into a working experience.

There is no single prescribed solution. We are intentionally leaving the interpretation and implementation open so that you can make meaningful decisions and show your strengths.

## The challenge

Explore and build an AI-powered interactive learning experience in the broad space of an **interactive whiteboard tutor**. Think about how technology could help a learner understand a topic through explanation, visual reasoning, demonstrations, interaction, or any other approach you believe is effective.

You decide what the product should be, who it should serve, what problem it should solve, and how to implement it. You may take the concept in an unexpected direction if you can explain the reasoning behind your choices.

## Freedom to explore

- Choose your own technology stack, architecture, AI models or providers, and tools.
- Define the learner, learning context, and scope you want to address.
- Decide which interactions and capabilities are most valuable.
- Use AI coding assistants or other development tools. You should understand the work and be able to explain the important decisions and submitted implementation.
- Prioritise a coherent, thoughtfully executed experience over an unnecessarily large feature set.

The examples and considerations in this repository are prompts for thinking, not a mandatory checklist. You are not expected to implement every idea mentioned here.

## What to submit

1. **GitHub repository** containing the source code and a README that explains the project.
2. **Live demo URL** where we can explore the working experience.
3. **Completed submission form:** [Open the Braynix Studios assignment form](https://docs.google.com/forms/d/e/1FAIpQLSdFJoTxMEuFZrCHTbEgv7bbg2uLf33SjP7n0w2qUONR4kMRcA/viewform?usp=publish-editor).

Include any access instructions needed to review the demo. If a feature uses sample, mocked, prerecorded, or simulated behaviour rather than a live service, describe that clearly.

## How we will review

We will consider the quality of your problem framing, product thinking, originality, engineering decisions, use of AI, learning experience, implementation, and communication. The evaluation framework in [`docs/06-evaluation-framework.md`](docs/06-evaluation-framework.md) explains the broad dimensions. It is guidance for a consistent review, not a rigid specification or an automatic hiring decision.

## Before you begin

Read the supporting notes if useful, then make the decisions you believe are right. We are interested in your reasoning as much as the final interface. A static mock-up by itself may not provide enough evidence of how your proposed experience works; please submit something meaningfully explorable.

## Important notes

- There is no fixed development time limit stated in this assignment. Submit when you are ready, and communicate any important limitations.
- Do not expose API keys, credentials, private tokens, or sensitive learner data in source control or the public demo.
- Do not use real people's personal or educational data without appropriate permission.
- Submission does not guarantee an interview, offer, or employment.
- This assignment does not by itself transfer ownership of your work to Braynix Studios. Any separate commercial use, licensing, or transfer of rights would need to be discussed and agreed in writing.

## Supporting documents

- [01 — Assignment overview](docs/01-assignment-overview.md)
- [02 — Product vision](docs/02-product-vision.md)
- [03 — Functional expectations](docs/03-functional-expectations.md)
- [04 — Engineering considerations](docs/04-engineering-considerations.md)
- [05 — Submission guidelines](docs/05-submission-guidelines.md)
- [06 — Evaluation framework](docs/06-evaluation-framework.md)
- [07 — Frequently asked questions](docs/07-faq.md)

**Braynix Studios**  
*Build thoughtfully. Explain your decisions. Show us what you can do.*
