import React from 'react'
import './News.css'

export default function News() {
  return (
    <div className='pt-5 news'>
      <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap w-full mb-20">
      <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">Phim hay trong tháng</h1>
        <div className="h-1 w-20 bg-indigo-500 rounded" />
      </div>
      <p className="lg:w-1/2 w-full leading-relaxed text-white">Phim hay tháng là tập hợp những bộ phim chiếu rạp hay nhất, mới nhất, được công chiếu trong tháng. Những bộ phim thuộc đủ các thể loại hành động, lãng mạn, kinh dị, sử thi... chất lượng, được đánh giá cao, hứa hẹn mang đến những giờ phút giải trí tuyệt vời trong rạp chiếu bóng. Phim hay tháng sẽ cung cấp đầy đủ thông tin phim, dễ dàng thuận tiện để các bạn có thể tìm kiếm vùa lựa chọn bộ phim phù hợp nhất để thưởng thức cùng gia đình và bạn bè. </p>
    </div>
    <div className="flex flex-wrap -m-4">
      <div className="xl:w-1/4 md:w-1/2 p-4">
        <div className="bg-gray-100 p-6 rounded-lg newtag">
          <img className="h-40 rounded w-full object-cover object-center mb-6" src="https://picsum.photos/720/400" alt="content" />
          <h3 className="tracking-widest text-white text-xs font-medium title-font">SUBTITLE</h3>
          <h2 className="text-lg text-white font-medium title-font mb-4">Chichen Itza</h2>
          <p className="leading-relaxed text-white">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
        </div>
      </div>
      <div className="xl:w-1/4 md:w-1/2 p-4">
        <div className="bg-gray-100 p-6 rounded-lg newtag">
          <img className="h-40 rounded w-full object-cover object-center mb-6" src="https://picsum.photos/720/400" alt="content" />
          <h3 className="tracking-widest text-white text-xs font-medium title-font">SUBTITLE</h3>
          <h2 className="text-lg text-white font-medium title-font mb-4">Colosseum Roma</h2>
          <p className="leading-relaxed text-white">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
        </div>
      </div>
      <div className="xl:w-1/4 md:w-1/2 p-4">
        <div className="bg-gray-100 p-6 rounded-lg newtag">
          <img className="h-40 rounded w-full object-cover object-center mb-6" src="https://picsum.photos/720/400" alt="content" />
          <h3 className="tracking-widest text-white text-xs font-medium title-font">SUBTITLE</h3>
          <h2 className="text-lg text-white font-medium title-font mb-4">Great Pyramid of Giza</h2>
          <p className="leading-relaxed text-white">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
        </div>
      </div>
      <div className="xl:w-1/4 md:w-1/2 p-4">
        <div className="bg-gray-100 p-6 rounded-lg newtag">
          <img className="h-40 rounded w-full object-cover object-center mb-6" src="https://picsum.photos/720/400" alt="content" />
          <h3 className="tracking-widest text-white text-xs font-medium title-font">SUBTITLE</h3>
          <h2 className="text-lg text-white font-medium title-font mb-4">San Francisco</h2>
          <p className="leading-relaxed text-white">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  )
}
