/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default ({show}) =>
  <div style={ {display: show ? 'block' : 'none'} }>
    <div className="thanks">
      <div dir="rtl">תודה רבה!</div>
      <div>Thanks!</div>
      <div>⬇</div>
    </div>

    <ul className='social' style={{ display: show ? 'block' : 'none' }}>
      <li>
        <a href="https://www.youtube.com/channel/UCdtCA5iCwvunMBgNYWLOjDw" target="_blank" rel="noreferrer">
          <img src="./social/youtube.svg" alt="youtube-logo" />
        </a>
      </li>
      <li>
        <a href="https://www.facebook.com/croptal" target="_blank" rel="noreferrer">
          <img src="./social/facebook.svg" alt="facebook-logo" />
        </a>
      </li>
      <li>
        <a href="https://www.instagram.com/croptalmusic" target="_blank" rel="noreferrer">
          <img src="./social/instagram.svg" alt="instagram-logo" />
        </a>
      </li>
      <li>
        <a href="https://soundcloud.com/croptal" target="_blank" rel="noreferrer">
          <img src="./social/soundcloud.svg" alt="soundcloud-logo" />
        </a>
      </li>
    </ul>
  </div>
  