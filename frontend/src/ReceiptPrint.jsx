import React from 'react';


const ReceiptPrint = () => {
    window.print();
    const currentDateTime = new Date().toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Use 24-hour format
    });
    return (
        <>
            <div className="h-full w-full fixed">
                <div id="MenuOverlay"
                    className="fixed bottom-0 z-50 w-full h-full bg-black bg-opacity-20 flex justify-end shadow-xl max-h-[100vh] opacity-0 transition-all duration-500 invisible">
                    <div
                        className="w-[250px] rounded-l-xl h-full bg-white flex flex-col justify-between absolute -right-[250px] transition-all duration-500">
                        <div className="flex flex-col items-center justify-between h-16 border-b-[1px] bg-transparent">
                            <div className="flex items-center justify-between w-full h-full">
                                <button className="h-16 w-16 rounded-full items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="icon text-gray-300" width="40px" height="40px" viewBox="0 0 24 24">
                                        <path fill="currentColor" fillRule="evenodd" d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22M8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 1 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 1 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06" clipRule="evenodd"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="mt-2 w-full">
                                <ul className="flex flex-col justify-between font-semibold w-full">
                                    <li className="flex items-center px-5 cursor-pointer h-12 text-gray-500 hover:text-[#189ab4]">
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="icon mr-2" width="30px" height="30px" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="m21.47 11.185l-1.03-1.43a2.5 2.5 0 0 0-2.03-1.05h-4.38v-2.14a2.5 2.5 0 0 0-2.5-2.5H4.56a2.507 2.507 0 0 0-2.5 2.5v9.94a1.5 1.5 0 0 0 1.5 1.5h1.22a2.242 2.242 0 0 0 4.44 0h5.56a2.242 2.242 0 0 0 4.44 0h1.22a1.5 1.5 0 0 0 1.5-1.5v-3.87a2.5 2.5 0 0 0-.47-1.45M7 18.935a1.25 1.25 0 1 1 1.25-1.25A1.25 1.25 0 0 1 7 18.935m6.03-1.93H9.15a2.257 2.257 0 0 0-4.3 0H3.56a.5.5 0 0 1-.5-.5v-9.94a1.5 1.5 0 0 1 1.5-1.5h6.97a1.5 1.5 0 0 1 1.5 1.5Zm3.97 1.93a1.25 1.25 0 1 1 1.25-1.25a1.25 1.25 0 0 1-1.25 1.25m3.94-2.43a.5.5 0 0 1-.5.5h-1.29a2.257 2.257 0 0 0-4.3 0h-.82v-7.3h4.38a1.52 1.52 0 0 1 1.22.63l1.03 1.43a1.53 1.53 0 0 1 .28.87Z">
                                            </path>
                                            <path fill="currentColor" d="M18.029 12.205h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 0 1">
                                            </path>
                                        </svg> Vận chuyển</li>
                                    <li className="flex items-center px-5 cursor-pointer h-12 text-gray-500 hover:text-[#189ab4]">
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="icon mr-2" width="30px" height="30px" viewBox="0 0 256 256">
                                            <path fill="currentColor" d="M216 60h-36.17a52 52 0 0 0-103.66 0H40a20 20 0 0 0-20 20v120a20 20 0 0 0 20 20h176a20 20 0 0 0 20-20V80a20 20 0 0 0-20-20m-88-24a28 28 0 0 1 27.71 24h-55.42A28 28 0 0 1 128 36m84 160H44V84h168Z">
                                            </path>
                                        </svg> Dịch vụ</li>
                                    <li className="flex items-center px-5 cursor-pointer h-12 text-gray-500 hover:text-[#189ab4]">
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="icon mr-2" width="30px" height="30px" viewBox="0 0 24 24">
                                            <g fill="none" fillRule="evenodd">
                                                <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z">
                                                </path>
                                                <path fill="currentColor" d="M12 4a2 2 0 0 0-2 2h4a2 2 0 0 0-2-2M9.354 3c.705-.622 1.632-1 2.646-1s1.94.378 2.646 1H18a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2h-4.268c.121-.34.268-.716.268-1.093V7H8.012a2 2 0 0 0-2 2v13.93a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h1.354zM12 2a4 4 0 0 0-3.236 1.636A3.977 3.977 0 0 0 9 5v1h6V5a3.977 3.977 0 0 0-1.764-1.364A4 4 0 0 0 12 2zM4 5h2v14H4V5zm16 0h-2v14h2V5zM4 19h2v2H4v-2zm16 0h-2v2h2v-2z">
                                                </path>
                                            </g>
                                        </svg> Đặt hàng</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="receipt-container w-[600px] bg-white p-5 mx-auto my-5 border border-gray-500">
                <h1 className="text-center text-2xl font-bold">Hóa Đơn</h1>
                <div className="flex justify-between mb-5">
                    <div className="font-medium">
                        <p>Thời gian: {currentDateTime}</p>
                    </div>
                    <div className="font-medium">
                        <p>Hóa đơn số: 123456</p>
                    </div>
                </div>

                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b border-gray-500 px-4 py-2 text-left">Tên sản phẩm</th>
                            <th className="border-b border-gray-500 px-4 py-2 text-left">Số lượng</th>
                            <th className="border-b border-gray-500 px-4 py-2 text-left">Giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-b border-gray-500 px-4 py-2">Sản phẩm A</td>
                            <td className="border-b border-gray-500 px-4 py-2">2</td>
                            <td className="border-b border-gray-500 px-4 py-2">200.000 VNĐ</td>
                        </tr>
                        <tr>
                            <td className="border-b border-gray-500 px-4 py-2">Sản phẩm B</td>
                            <td className="border-b border-gray-500 px-4 py-2">1</td>
                            <td className="border-b border-gray-500 px-4 py-2">150.000 VNĐ</td>
                        </tr>
                    </tbody>
                </table>

                <div className="flex justify-between font-bold mt-5">
                    <p>Tổng cộng:</p>
                    <p>350.000 VNĐ</p>
                </div>
            </div>
        </>
    );
};

export default ReceiptPrint;
