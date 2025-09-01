export const ENV = {
  NODE: import.meta.env.VITE_NODE_ADDRESS as string,
  CONTRACT: import.meta.env.VITE_CONTRACT as `0x${string}`,
};