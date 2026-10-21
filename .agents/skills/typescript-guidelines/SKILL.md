---
name: typescript-guidelines
description: Write and organize TypeScript with clear types and the least complexity needed. Use for TypeScript code in any framework or runtime; defer framework-specific conventions to the relevant skill.
---

# TypeScript Guidelines

Write TypeScript that makes the data and behavior easy to understand. Prefer the simplest implementation that meets the current requirements; add abstractions only when they remove real repetition or clarify a meaningful boundary.

Use `programming-guidelines` for shared principles on scope, dependencies, and file boundaries.

## Types

- Let TypeScript infer obvious local types. Add annotations at public boundaries, function parameters when they aid understanding, and places where inference is too broad or unclear.
- Prefer `unknown` over `any` for values whose shape is not known. Narrow and validate the value before using it.
- Avoid type assertions when the value can be narrowed or modeled correctly. Assertions do not validate runtime data.
- Model distinct states explicitly, often with a discriminated union, rather than combining loosely related optional fields or boolean flags.
- Use generics when a function or type truly preserves a relationship between multiple values. Avoid generic parameters that do not improve the contract.
- Prefer existing platform and project types over recreating them. Keep types close to the code that owns them; extract shared types when more than one module genuinely needs them.

## Functions and modules

- Keep functions focused and direct. Use early returns when they make the main path easier to follow.
- Choose names that describe intent. Avoid comments that merely narrate the next line; explain non-obvious constraints or decisions instead.
- Keep small, related code together when splitting it would make readers jump between files without clarifying responsibilities. Split modules when a distinct responsibility or growing size makes the code harder to navigate.
- Avoid speculative utility layers, wrapper functions, and configuration options for hypothetical future needs.
- Make side effects visible in the function or module that owns them. Keep pure transformations easy to identify and reuse where that helps.

## Errors and asynchronous code

- Handle errors where the code can make a useful decision. Otherwise, let them reach the caller rather than silently swallowing or redundantly wrapping them.
- Validate untrusted input at the boundary where it enters the application. Do not add repeated checks for values already guaranteed by a trusted internal type.
- Use `async`/`await` for readable sequential asynchronous flows. Avoid detached promises unless their lifecycle and error handling are intentional.
- Preserve useful error context when translating an error; do not discard the original cause.

## Working in an existing project

- Follow the project's TypeScript version, compiler settings, naming, module, and error-handling conventions.
- Inspect nearby code before introducing a pattern or dependency. Do not change strictness settings or add a library just to solve a local typing inconvenience.
- Keep runtime validation separate from compile-time typing: TypeScript types disappear at runtime, so external data still needs validation appropriate to its risk.
- Use framework- or runtime-specific guidance when available. This skill covers the shared TypeScript decisions, not framework architecture.

## Examples

Examples use a fictional e-commerce app (catalog, products, cart, and checkout) for consistency. This context is illustrative, not a requirement for projects using the skill.

- **DON'T:** Silence uncertainty with `any`:

  ```ts
  const product: any = await response.json();
  addToCart(product.id, product.price);
  ```

- **DO:** Keep the boundary unknown and narrow it before use:

  ```ts
  type Product = { id: string; price: number };

  function isProduct(value: unknown): value is Product {
    return (
      typeof value === 'object' &&
      value !== null &&
      'id' in value && typeof value.id === 'string' &&
      'price' in value && typeof value.price === 'number'
    );
  }

  const payload: unknown = await response.json();
  if (isProduct(payload)) addToCart(payload.id, payload.price);
  ```
