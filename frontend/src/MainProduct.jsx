import React from 'react'
import svgImage1 from './assets/svgImage1.svg'
import svgImage2 from './assets/svgImage2.svg'
import svgImage3 from './assets/svgImage3.svg'
import svgImage4 from './assets/svgImage4.svg'
import svgImage5 from './assets/svgImage5.svg'
import phone from './assets/phone.svg'


const MainProduct = () => {
    return (
        <>
            <div class="stack">
                <div class="svgImage">
                    <img src={svgImage1} class="img1" />
                    <img src={svgImage4} class="img2" />
                    <img src={svgImage2} class="img3" />
                    <img src={svgImage5} class="img4" />
                    <img src={svgImage3} class="img5" />
                    <img src={svgImage3} class="img6" />

                    <section class="main">
                        <div class="left">
                            <h1>
                                Post Office Online App
                            </h1>
                            <p>Sử dụng ứng dụng bưu điện để gửi và nhận thông tin về bưu kiện</p>
                            <button>Sử dung ngay</button>
                        </div>
                        <div class="right">
                            <div class="containerImage">
                                <img src={phone} />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
     
        </>
    )
}

export default MainProduct