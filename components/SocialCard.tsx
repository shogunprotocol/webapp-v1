import { Twitter, Send } from 'lucide-react';

const SocialCard = () => {
  return (
    <div className="w-full md:w-[500px] h-[84px] rounded-[24px] bg-[#121720] border border-[#1C2431] p-4 backdrop-blur-xl flex items-center justify-center gap-4">
      <span className="text-white">Stay connected with us on</span>
      <div className="flex gap-2">
        <a
          href="https://x.com/shogun_fi"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gradient-to-r from-[#5FFBF1] to-[#0EC1FB] text-black hover:opacity-90 transition-opacity"
        >
          <Twitter size={20} />
        </a>
        <a
          href="https://t.me/+Un2hqPvlzYBhZTY0"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gradient-to-r from-[#5FFBF1] to-[#0EC1FB] text-black hover:opacity-90 transition-opacity"
        >
          <Send size={20} />
          {/* <Discord size={20} /> */}
        </a>
      </div>
    </div>
  );
};

export default SocialCard; 