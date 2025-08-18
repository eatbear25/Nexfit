"use client";
import { Th, Td } from "../_components/TableCell";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import CouponSkeleton from "../_components/CouponSkeleton"; // 引入骨架屏組件

// 預設優惠券資料（當 API 讀取失敗時使用）
const defaultCoupons = [
  {
    code: "#hello888",
    value: "$100",
    expiry: "2025-05-04",
    status: "尚未使用",
    note: "新會員首購禮",
  },
  {
    code: "#sale150",
    value: "$150",
    expiry: "2025-05-05",
    status: "尚未使用",
    note: "夏日Sale",
  },
];

export default function CouponPage() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 使用 AuthContext 獲取用戶資料
  const { user, isLoading, updateUser, refreshUser } = useAuth();

  // 從 API 獲取優惠券資料
  const fetchCoupons = async (userId) => {
    try {
      setLoading(true);
      setError(null);

      // 從 AuthContext 或其他地方獲取 token
      const token = localStorage.getItem("token"); // 假設 token 存在 localStorage 中

      const response = await fetch(`/api/user-discounts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 加入 Authorization header
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("請重新登入");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // 根據你的 API 回應格式：{ success: true, data: [...] }
      if (result.success && Array.isArray(result.data)) {
        // 將後端資料格式轉換為前端需要的格式
        const formattedCoupons = result.data.map((item) => ({
          code: `#DISC${item.id}`, // 生成優惠券代碼
          value:
            item.discount_type === "percentage"
              ? `${item.discount_value}%`
              : `${item.discount_value}`,
          expiry: new Date().toISOString().split("T")[0], // 需要從 user_discounts 表獲取 expires_at
          status: "尚未使用", // 因為查詢已經篩選 is_used = 0
          note: item.name,
        }));
        setCoupons(formattedCoupons);
      } else {
        // 如果 API 回傳格式不符預期或沒有資料
        setCoupons([]);
      }
    } catch (error) {
      console.error("獲取優惠券資料失敗:", error);
      setError(error.message);
      // 發生錯誤時不顯示預設資料，而是顯示空陣列
      setCoupons([]);
    } finally {
      setLoading(false);
    }
  };

  // 當用戶資料載入完成後，獲取優惠券資料
  useEffect(() => {
    if (!isLoading && user?.id) {
      fetchCoupons(user.id);
    } else if (!isLoading && !user) {
      // 如果沒有用戶資料，停止載入並顯示空狀態
      setLoading(false);
    }
  }, [user, isLoading]);

  // 重新整理優惠券資料
  const handleRefresh = () => {
    if (user?.id) {
      fetchCoupons(user.id);
    }
  };

  // 載入中狀態 - 使用引入的骨架屏組件
  if (loading) {
    return <CouponSkeleton rowCount={5} cardCount={3} />;
  }

  // 未登入狀態
  if (!user) {
    return (
      <div className="p-10 w-4/5 h-full mt-10 mx-10 border border-borderColor rounded-lg">
        <h3 className="text-2xl md:text-3xl text-fontColor mb-6">優惠券</h3>
        <div className="flex justify-center items-center h-32">
          <div className="text-gray-500">請先登入以查看您的優惠券</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 w-4/5 h-full mt-10 mx-10 border border-borderColor rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl md:text-3xl text-fontColor">優惠券</h3>
        {/* <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          重新整理
        </button> */}
      </div>

      {/* 錯誤訊息顯示 */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          載入優惠券時發生錯誤: {error}
        </div>
      )}

      {/* 無優惠券狀態 */}
      {coupons.length === 0 ? (
        <div className="flex justify-center items-center h-32">
          <div className="text-gray-500">暫無可用的優惠券</div>
        </div>
      ) : (
        <>
          {/* 桌機版 Table */}
          <table className="w-full text-base border-collapse border-gray-400 hidden md:table">
            <thead>
              <tr className="bg-[#F9F9F9]">
                {/* <Th>代碼</Th> */}
                <Th>面額</Th>
                <Th>使用期限</Th>
                <Th>使用狀況</Th>
                <Th>備註</Th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((item, index) => (
                <tr key={index}>
                  {/* <Td>{item.code}</Td> */}
                  <Td>${item.value}</Td>
                  <Td>{item.expiry}</Td>
                  <Td>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        item.status === "尚未使用"
                          ? "border border-[#A9BA5C] text-[#A9BA5C] "
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </Td>
                  <Td>{item.note}</Td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 手機版卡片 */}
          <div className="flex flex-col gap-4 md:hidden">
            {coupons.map((item, index) => (
              <div
                key={index}
                className="border border-borderColor rounded-lg p-4 text-fontColor bg-[#F9F9F9]"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium">代碼:</span>
                  <span className="font-mono">{item.code}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">面額:</span>
                  <span className="font-medium">${item.value}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">使用期限:</span>
                  <span>{item.expiry}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">使用狀況:</span>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      item.status === "尚未使用"
                        ? "border border-[#A9BA5C] text-[#A9BA5C] "
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">備註:</span>
                  <span className="text-right">{item.note}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
