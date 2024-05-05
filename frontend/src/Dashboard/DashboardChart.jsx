// Import các thư viện và component cần thiết
import { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import AxiosInstance from "../components/AxiosInstance";

export function Satisfaction({ data }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (data.length === 0) return;

        // Tính số lượng của mỗi loại đánh giá
        const excellentCount = data.filter(appointment => appointment.rate === 'E').length;
        const goodCount = data.filter(appointment => appointment.rate === 'G').length;
        const okCount = data.filter(appointment => appointment.rate === 'O').length;
        const poorCount = data.filter(appointment => appointment.rate === 'P').length;
        const terribleCount = data.filter(appointment => appointment.rate === 'T').length;

        // Tính tổng số lượng đánh giá
        const totalCount = data.length;

        // Tính phần trăm của mỗi loại đánh giá
        const excellentPercentage = (excellentCount / totalCount) * 100;
        const goodPercentage = (goodCount / totalCount) * 100;
        const okPercentage = (okCount / totalCount) * 100;
        const poorPercentage = (poorCount / totalCount) * 100;
        const terriblePercentage = (terribleCount / totalCount) * 100;

        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['EXCELLENT', 'GOOD', 'OK', 'POOR', 'TERRIBLE'],
                    datasets: [{
                        data: [excellentPercentage, goodPercentage, okPercentage, poorPercentage, terriblePercentage],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)', // EXCELLENT: đỏ
                            'rgba(54, 162, 235, 0.5)', // GOOD: xanh dương
                            'rgba(255, 206, 86, 0.5)', // OK: vàng
                            'rgba(75, 192, 192, 0.5)', // POOR: xanh lá cây
                            'rgba(153, 102, 255, 0.5)' // TERRIBLE: tím
                        ],
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }

        return () => {
            const chartInstance = chartRef.current ? Chart.getChart(chartRef.current) : null;
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [data]);

    return (
        <canvas ref={chartRef} />
    );
}

// Component biểu đồ phần trăm hài lòng và tình trạng thanh toán
export function SatisfactionAndBillingChart({ data }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const completedCount = data.filter(appointment => appointment.completed).length;
            const totalCount = data.length;
            const satisfactionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
            const PaidCount = data.filter(appointment => appointment.feestatus).length;
            const PaidPercentage = totalCount > 0 ? (PaidCount / totalCount) * 100 : 0;

            const ctx = chartRef.current.getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Paid Bills', 'Unpaid Bills'],
                    datasets: [
                        {
                            label: ['Percentage Of Paid Bills', 'Percentage Of Unpaid Bills'],
                            data: [PaidPercentage, 100 - PaidPercentage],
                            borderColor: 'yellow',
                            backgroundColor: ['rgba(255, 255, 0, 0.1)', 'rgba(0, 255, 0, 0.35)'],
                            pointRadius: 5,
                            pointHoverRadius: 5,
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                        title: {
                            display: true,
                            text: 'Percent Satisfaction and Billing Status',
                        },
                        scales: {
                            y: {
                                ticks: {
                                    stepSize: 10,
                                    beginAtZero: true,
                                    callback: function (value, index, values) {
                                        return value + '%';
                                    }
                                }
                            }
                        },
                        datalabels: {
                            color: 'black',
                            font: {
                                weight: 'bold',
                                size: 13,
                            },
                            formatter: (value, context) => {
                                return value.toFixed(2) + '%';
                            }
                        }
                    },
                },
            });
        }

        return () => {
            const chartInstance = chartRef.current ? Chart.getChart(chartRef.current) : null;
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [data]);

    return <canvas ref={chartRef} />;
}

// Component biểu đồ số cuộc hẹn trong tuần
export function WeeklyAppointmentChart({ data }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const generateAppointmentData = () => {
                const currentDate = new Date();
                const currentDayOfWeek = currentDate.getDay(); // Lấy ngày trong tuần của ngày hiện tại (0: Chủ Nhật, 1: Thứ Hai, ..., 6: Thứ Bảy)
                const appointmentCounts = Array(7).fill(0); // Tạo một mảng gồm 7 phần tử, mỗi phần tử được khởi tạo là 0
                for (let i = 0; i < 7; i++) {
                    const date = new Date(currentDate);
                    date.setDate(date.getDate() + i);
                    const dayOfWeek = date.getDay(); // Lấy ngày trong tuần của ngày hiện tại trong vòng lặp
                    const appointmentsOnDate = data.filter(appointment => {
                        const appointmentDate = new Date(appointment.date);
                        return (
                            appointmentDate.getDay() === dayOfWeek // So sánh ngày trong tuần của cuộc hẹn với ngày trong tuần của ngày hiện tại trong vòng lặp
                        );
                    });
                    if (dayOfWeek >= currentDayOfWeek) {
                        appointmentCounts[dayOfWeek - currentDayOfWeek] = appointmentsOnDate.length; // Gán số lượng cuộc hẹn trong mỗi ngày vào mảng
                    } else {
                        appointmentCounts[7 - (currentDayOfWeek - dayOfWeek)] = appointmentsOnDate.length; // Gán số lượng cuộc hẹn trong mỗi ngày vào mảng, nếu ngày trong tuần của cuộc hẹn nhỏ hơn ngày trong tuần hiện tại
                    }
                }
                return appointmentCounts;
            };

            const generateDayLabels = () => {
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                const todayIndex = new Date().getDay(); // Lấy chỉ số của ngày hiện tại trong tuần (0: Chủ Nhật, 1: Thứ Hai, ..., 6: Thứ Bảy)
                const labels = [];
                for (let i = todayIndex; i < todayIndex + 7; i++) {
                    labels.push(days[i % 7] + '(day ' + i + ')'); // Lấy ngày từ ngày hiện tại đến ngày kế tiếp 6 ngày
                }
                return labels;
            };

            const appointmentDataset = {
                labels: generateDayLabels(),
                datasets: [{
                    label: 'Appointments',
                    data: generateAppointmentData(),
                    backgroundColor: 'rgba(255, 99, 132, 0.5)', // Màu của dataset
                    borderColor: 'rgba(255, 99, 132, 1)', // Màu viền của dataset
                    borderWidth: 1,
                }]
            };

            const ctx = chartRef.current.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: appointmentDataset,
                options: {
                    plugins: [ChartDataLabels],
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }

        return () => {
            const chartInstance = chartRef.current ? Chart.getChart(chartRef.current) : null;
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [data]);

    return <canvas ref={chartRef} />;
}

// Component biểu đồ số lượng nhân viên, bệnh nhân, thiết bị và thuốc
export function EntityCountChart({ countStaff, countPatient, countDevice, countMedicine }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Staffs', 'Patients', 'Devices', 'Medicines'],
                    datasets: [{
                        label: 'Amount',
                        data: [countStaff.length, countPatient.length, countDevice.length, countMedicine.length],
                        backgroundColor: ['rgba(54, 162, 235, 0.5)', // Staffs: xanh dương
                            'rgba(255, 99, 132, 0.5)', // Patients: đỏ
                            'rgba(255, 206, 86, 0.5)', // Devices: vàng
                            'rgba(153, 102, 255, 0.5)'],
                    }]
                },
                options: {
                    responsive: true,
                    display: true,
                    text: 'Satisfaction of Patients',
                },
                datalabels: {
                    color: 'white',
                    font: {
                        weight: 'bold',
                        size: 18,
                    },
                    formatter: (value, context) => {
                        return value.toFixed(2) + '%';
                    }
                },
                plugins: [ChartDataLabels]
            });
        }

        return () => {
            const chartInstance = chartRef.current ? Chart.getChart(chartRef.current) : null;
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [countStaff, countPatient, countDevice, countMedicine]);

    return <canvas ref={chartRef} />;
}

// Component chính DashboardChart
export default function DashboardChart() {
    const [data, setData] = useState([]);
    const [countStaff, setCountStaff] = useState([]);
    const [countPatient, setCountPatient] = useState([]);
    const [countMedicine, setCountMedicine] = useState([]);
    const [countDevice, setCountDevice] = useState([]);
    const [countSchedule, setCountSchedule] = useState([]);

    useEffect(() => {
        AxiosInstance.get(`appointments/`)
            .then(res => setData(res.data))
            .catch(err => console.log(err));

        AxiosInstance.get(`staffs/`)
            .then(res => setCountStaff(res.data))
            .catch(err => console.log(err));

        AxiosInstance.get(`device/`)
            .then(res => setCountDevice(res.data))
            .catch(err => console.log(err));

        AxiosInstance.get(`patients/`)
            .then(res => setCountPatient(res.data))
            .catch(err => console.log(err));

        AxiosInstance.get(`medicines/`)
            .then(res => setCountMedicine(res.data))
            .catch(err => console.log(err));

        AxiosInstance.get(`schedule/`)
            .then(res => setCountSchedule(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <SatisfactionAndBillingChart data={data} />
            <WeeklyAppointmentChart data={data} />
            <EntityCountChart
                countStaff={countStaff}
                countPatient={countPatient}
                countDevice={countDevice}
                countMedicine={countMedicine}
            />
        </>
    );
}
