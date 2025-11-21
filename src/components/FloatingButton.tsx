export default function FloatingButton(props: any) {
  return (
    <div onClick={props.onClick}>
      <div className="fixed right-0 top-1/2 -translate-y-1/2 rounded-l-full cursor-pointer bg-blue-300 h-12 w-12 flex items-center justify-center">
        八奈见
      </div>
    </div>
  );
}
