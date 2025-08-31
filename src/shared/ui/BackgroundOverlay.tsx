export function BackgroundOverlay() {
  return (
    <div class="absolute inset-0 -z-10">
      <div class="absolute inset-0 bg-[#151515AD]"></div>
      <div class="absolute inset-0 w-[65vw] h-full
        [--mask:linear-gradient(to_right,rgba(0,0,0,1),rgba(0,0,0,0))]
        [-webkit-mask-image:var(--mask)] [mask-image:var(--mask)]
        [-webkit-mask-size:100%_100%] [mask-size:100%_100%]
        [-webkit-mask-repeat:no-repeat] [mask-repeat:no-repeat]
        [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_right,#5E584A87,#5E584A00)]
        [background-size:20px_20px,20px_20px,auto]
        [background-repeat:repeat,repeat,no-repeat]">
      </div>
    </div>
  )
}
