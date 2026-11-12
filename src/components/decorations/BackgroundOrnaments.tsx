import { assets } from '../../data/assets';
import Sparkles from './Sparkles';
export default function BackgroundOrnaments() {
  return (
    <div className="mandalas" aria-hidden="true">
      <div className="mandala-left">
        <img src={assets.mandala} alt="" />
      </div>
      <div className="mandala-right">
        <img src={assets.mandala} alt="" />
      </div>
      <Sparkles />
    </div>
  );
}
