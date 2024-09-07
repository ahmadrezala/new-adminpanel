"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  RadialBar,
  RadialBarChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IconEye } from "../_components/icons/icons";
import { useSalesChart } from "./_api/get-data-salesChart";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function Home() {
  const { data: SalesChart } = useSalesChart();
  const router = useRouter();

  useEffect(() => {
    // const fetchSession = async () => await getSession();
    // fetchSession();
  }, []);

  const data = [
    {
      name: "گوشی",
      uv: 200,

      fill: "#8884d8",
    },
    {
      name: "لپتاپ",
      uv: 100,

      fill: "#9323eb",
    },
    {
      name: "لوازم خانگی",
      uv: 130,

      fill: "#1dcaf5",
    },
    {
      name: "پوشاک",
      uv: 40,

      fill: "#4e41ff",
    },
  ];
  const data1 = [
    {
      name: "گوشی",
      uv: 200,
    },
    {
      name: "لپتاپ",
      uv: 100,
    },
    {
      name: "لوازم خانگی",
      uv: 130,
    },
    {
      name: "پوشاک",
      uv: 40,
    },
    {
      name: "لپتاپ",
      uv: 100,
    },
    {
      name: "لوازم خانگی",
      uv: 130,
    },
    {
      name: "پوشاک",
      uv: 40,
    },
  ];

  const style = {
    top: "50%",
    right: 0,
    transform: "translate(0, -50%)",
    lineHeight: "24px",
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#b1afafda] flex flex-col items-center justify-center p-6 rounded-md">
          <div className="text-black">{` تاریخ : ${label} `}</div>
          <div className="text-black">{` تومان : ${payload[0].value}`}</div>
        </div>
      );
    }
  };

  const CustomTickY = (props: any) => {
    const { x, y, payload } = props;
    return (
      <text x={x - 25} y={y} textAnchor="end" fill="#fff" fontSize={12}>
        {payload.value}
      </text>
    );
  };

  const CustomTickX = (props: any) => {
    const { x, y, payload } = props;
    return (
      <text x={x - 0} y={y + 10} textAnchor="end" fill="#fff" fontSize={12}>
        {payload.value}
      </text>
    );
  };

  return (
    <>
      <div className="flex flex-col px-[40px]">
        <div className="mt-[40px]">
          <h1 className="text-white text-[24px]">نمودارها</h1>
        </div>
        <div className="flex mt-[40px] gap-5">
          <div className="bg-dark-navy border-[1px] border-solid border-charcoal w-full flex items-center justify-center py-[18px] px-[20px] rounded-2xl">
            <div className="flex">
              <div className="w-10 h-10 rounded-full ml-3 flex items-center justify-center bg-charcoal">
                <IconEye color="#786eff" />
              </div>
              <div>
                <h2 className="text-[12px] text-base-content">
                  تعداد دسته بندی
                </h2>
                <div className="text-white flex items-center">
                  <h1 className="font-bold text-[24px]">200</h1>
                  <div className="bg-[#00311a] mr-5 text-[#09a35c] text-[12px] px-[6px]">
                    34%
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-dark-navy border-[1px] border-solid border-charcoal w-full flex items-center justify-center py-[18px] px-[20px] rounded-2xl">
            <div className="flex">
              <div className="w-10 h-10 rounded-full ml-3 flex items-center justify-center bg-charcoal">
                <IconEye color="#786eff" />
              </div>
              <div>
                <h2 className="text-[12px] text-base-content">تعداد برند</h2>
                <div className="text-white flex items-center">
                  <h1 className="font-bold text-[24px]">400</h1>
                  <div className="bg-[#00311a] mr-5 text-[#09a35c] text-[12px] px-[6px]">
                    34%
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-dark-navy border-[1px] border-solid border-charcoal w-full flex items-center justify-center py-[18px] px-[20px] rounded-2xl">
            <div className="flex">
              <div className="w-10 h-10 rounded-full ml-3 flex items-center justify-center bg-charcoal">
                <IconEye color="#786eff" />
              </div>
              <div>
                <h2 className="text-[12px] text-base-content">
                  تعداد فروشندگان
                </h2>
                <div className="text-white flex items-center">
                  <h1 className="font-bold text-[24px]">90</h1>
                  <div className="bg-[#00311a] mr-5 text-[#09a35c] text-[12px] px-[6px]">
                    34%
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-dark-navy border-[1px] border-solid border-charcoal w-full flex items-center justify-center py-[18px] px-[20px] rounded-2xl">
            <div className="flex">
              <div className="w-10 h-10 rounded-full ml-3 flex items-center justify-center bg-charcoal">
                <IconEye color="#786eff" />
              </div>
              <div>
                <h2 className="text-[12px] text-base-content">تعداد محصول</h2>
                <div className="text-white flex items-center">
                  <h1 className="font-bold text-[24px]">2306</h1>
                  <div className="bg-[#00311a] mr-5 text-[#09a35c] text-[12px] px-[6px]">
                    34%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="flex justify-center mt-4">
          <div className="p-[36px] border-[1px] border-solid border-charcoal bg-dark-navy rounded-2xl w-full">
            <div className="text-white text-[20px] pb-[20px] border-b-[1px] border-solid border-charcoal">
              نمودار فروش ماهانه
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={150}
                  height={40}
                  // data={SalesChart?.data as any}
                  data={data1}
                  margin={{
                    top: 50,
                    right: 0,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A237FF" stopOpacity={1} />
                      <stop offset="50%" stopColor="#7472FF" stopOpacity={1} />
                      <stop offset="100%" stopColor="#3FD6FF" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeWidth={0.1} strokeDasharray="0 0" />
                  <XAxis dataKey="uv" tick={<CustomTickX />} />
                  <YAxis tick={<CustomTickY />} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />

                  <Bar
                    dataKey="uv"
                    fill="url(#colorUv)"
                    barSize={20}
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="flex mt-4 gap-4 h-[490px]">
          <div className="h-full w-full bg-dark-navy px-[36px] py-[22px] border-[1px] border-solid border-charcoal rounded-2xl">
            <div className=" flex flex-col border-b-[1px] pb-[22px] border-b-solid border-b-charcoal">
              <span>محبوب ترین</span>
              <span className="text-[20px] font-semibold">دسته بندی ها</span>
            </div>
            <div className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="40%"
                  innerRadius="10%"
                  outerRadius="80%"
                  barSize={20}
                  data={data}
                >
                  <RadialBar
                    minAngle={15}
                    background={{ fill: "#1c243a" }}
                    clockWise
                    dataKey="uv"
                  />
                  <Legend
                    iconSize={10}
                    layout="vertical"
                    verticalAlign="middle"
                    wrapperStyle={style}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="h-full w-full bg-dark-navy px-[36px] py-[22px] border-[1px] border-solid border-charcoal rounded-2xl">
            <div className=" flex flex-col border-b-[1px] pb-[22px] border-b-solid border-b-charcoal">
              <span>تعداد محصول</span>
              <span className="text-[20px] font-semibold">دسته بندی ها</span>
            </div>
            <div className="w-full h-full">
              <ResponsiveContainer width="100%" height="80%">
                <BarChart
                  width={150}
                  height={40}
                  data={data1}
                  margin={{
                    top: 50,
                    right: 20,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A237FF" stopOpacity={1} />
                      <stop offset="50%" stopColor="#7472FF" stopOpacity={1} />
                      <stop offset="100%" stopColor="#3FD6FF" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeWidth={0.1} strokeDasharray="0 0" />
                  <XAxis dataKey="name" tick={<CustomTickX />} />
                  <YAxis tick={<CustomTickY />} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />

                  <Bar
                    dataKey="uv"
                    fill="url(#colorUv)"
                    barSize={20}
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
