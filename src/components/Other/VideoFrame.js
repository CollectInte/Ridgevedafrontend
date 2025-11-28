export default function VideoFrame({ setOpenVideo }) {
  return (
    <>
      <div className={`modal-video-block`} onClick={() => setOpenVideo(false)}>
        <div className={`modal-video-main open`} onClick={(e) => { e.stopPropagation() }}>
          <div className="video-block h-full w-full">
            <iframe src="https://www.youtube.com/embed/RaQKTgGyyyo" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
