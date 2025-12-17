export default function AstroButton({text, handleClick}) {

  return (
    <button className="
      group
      rounded-[12px]
      p-[1.5px]
    text-white
      text-sm
      h-10
      w-40
      font-medium
      transition
      duration-300
      flex
      items-center
      justify-center
      hover:shadow-2xl
      hover:shadow-purple-600/30
      cursor-pointer"
      style={{
        backgroundImage:
          "linear-gradient(var(--components-background), var(--components-background)), " +
          "linear-gradient(to right, #a855f7, #d946ef, #22d3ee)",
        backgroundOrigin: "border-box",
        backgroundClip: "padding-box, border-box",
        border: "2px solid transparent",
      }}
      onClick={handleClick}
    >
      <span className="
        rounded-[12px]
        w-full
        h-full
        flex
        items-center
        justify-center
        transition
        duration-300
        ease-in-out
        group-hover:bg-gradient-to-br
      group-hover:from-gray-700
      group-hover:to-gray-900"
        style={{
          backgroundColor: "var(--components-background)",
        }}
      >
        {text}
      </span>
    </button>
  )
}