# Documentation

Table of contents:

- [Errors](#errors)
  - [`kuusi-init-directory-not-empty`](#kuusi-init-directory-not-empty)

## Errors

Sometimes kuusi may tell you that your code sucks and give you an error
alongside it, here is what they all mean.

### kuusi-init-directory-not-empty

```ts
new Error(
  `kuusi-init-directory-not-empty: The project directory is not empty.`,
);
```

Thrown when the project directory is not empty.
