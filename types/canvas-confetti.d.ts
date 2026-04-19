declare module "canvas-confetti" {
  type Options = {
    particleCount?: number
    spread?: number
    origin?: { x?: number; y?: number }
    colors?: string[]
  }

  type ConfettiFn = (options?: Options) => void

  const confetti: ConfettiFn
  export default confetti
}
