import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const InvoicePrint = () => {
  const { id } = useParams();

  const post = useSelector((state) =>
    state.postList.posts.find((p) => p._id === id)
  );

  useEffect(() => {
    if (post) {
      setTimeout(() => {
        window.print();
      }, 300);
    }
  }, [post]);

  if (!post) return <div>Loading...</div>;

  const currentDateTime = new Date().toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="w-full px-2">
      <div className="receipt-container w-full max-w-[600px] min-w-[320px] bg-white p-4 mx-auto my-4 border border-gray-500">

        <h1 className="text-center text-lg sm:text-xl md:text-2xl font-bold">
          Hóa Đơn
        </h1>

        <div className="receipt-header flex flex-col mt-3 mb-4 text-xs sm:text-sm md:text-base gap-1">

          <p className="whitespace-nowrap">
            Thời gian: {currentDateTime}
          </p>

          <p className="whitespace-nowrap">
            Hóa đơn số: {post._id}
          </p>

        </div>

        <table className="w-full border-collapse text-xs sm:text-sm md:text-base">
          <thead>
            <tr>
              <th className="border-b border-gray-500 px-2 py-2 text-left">
                Tên sản phẩm
              </th>
              <th className="border-b border-gray-500 px-2 py-2 text-left w-[60px]">
                SL
              </th>
              <th className="border-b border-gray-500 px-2 py-2 text-left">
                Giá
              </th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="border-b border-gray-500 px-2 py-2 break-words">
                {post.postItem}
              </td>
              <td className="border-b border-gray-500 px-2 py-2">1</td>
              <td className="border-b border-gray-500 px-2 py-2">
                {post.price} VNĐ
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-between font-bold mt-4 text-sm md:text-base">
          <p>Tổng cộng:</p>
          <p>{post.price} VNĐ</p>
        </div>
      </div>

      <style>
        {`
          @media print {
            .receipt-header {
              display: flex !important;
              flex-direction: column !important;
            }

            .receipt-header p {
              white-space: nowrap !important;
            }

            body {
              margin: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default InvoicePrint;