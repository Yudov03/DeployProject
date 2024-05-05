import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import AxiosInstance from "../components/AxiosInstance";

// Hàm tính phần trăm từ số lượng và tổng số lượng
const calculatePercentage = (count, totalCount) => {
    return totalCount > 0 ? (count / totalCount) * 100 : 0;
};

// Hàm tạo dataset cho biểu đồ
const createDataset = (labels, data, backgroundColor) => {
    return {
        labels,
        datasets: [{
            data,
            backgroundColor,
        }]
    };
};

// Component biểu đồ cảm thấy hài lòng
export function Satisfaction({ data }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (data.length === 0) return;

        const counts = {
            'E': 0,
            'G': 0,
            'O': 0,
            'P': 0,
            'T': 0
        };

        data.forEach(appointment => {
            counts[appointment.rate]++;
        });

        const totalCount = data.length;

        const percentages = Object.values(counts).map(count => calculatePercentage(count, totalCount));

        const ctx = chartRef.current.getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: createDataset(['EXCELLENT', 'GOOD', 'OK', 'POOR', 'TERRIBLE'], percentages, [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)'
            ]),
            options: {
                responsive: true,
                maintainAspectRatio: false
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
                            weight: '',
                            size: 13,
                        },
                        formatter: (value, context) => {
                            return value.toFixed(0) + '%';
                        }
                    }
                },
            },

            plugins: [ChartDataLabels]
        });

        return () => {
            const chartInstance = chartRef.current ? Chart.getChart(chartRef.current) : null;
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [data]);

    return <canvas ref={chartRef} />;
}

// Component biểu đồ phần trăm hài lòng và tình trạng thanh toán
export function SatisfactionAndBillingChart({ data }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (data.length === 0) return;

        const completedCount = data.filter(appointment => appointment.completed).length;
        const totalCount = data.length;
        const satisfactionPercentage = calculatePercentage(completedCount, totalCount);
        const paidCount = data.filter(appointment => appointment.feestatus).length;
        const paidPercentage = calculatePercentage(paidCount, totalCount);
        const unpaidPercentage = 100 - paidPercentage;

        const ctx = chartRef.current.getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: createDataset(['Paid Bills', 'Unpaid Bills'], [paidPercentage, unpaidPercentage], [
                'rgba(0, 255, 0, 0.35)',
                'rgba(255, 255, 0, 0.1)',

            ]),
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
                            weight: '',
                            size: 13,
                        },
                        formatter: (value, context) => {
                            return value.toFixed(2) + '%';
                        }
                    }
                },
            },

            plugins: [ChartDataLabels]
        });

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
        if (data.length === 0) return;

        const generateAppointmentData = () => {
            const currentDate = new Date();
            const currentDayOfWeek = currentDate.getDay();
            const appointmentCounts = Array(7).fill(0);
            for (let i = 0; i < 7; i++) {
                const date = new Date(currentDate);
                date.setDate(date.getDate() + i);
                const dayOfWeek = date.getDay();
                const appointmentsOnDate = data.filter(appointment => {
                    const appointmentDate = new Date(appointment.date);
                    return (
                        appointmentDate.getDay() === dayOfWeek
                    );
                });
                if (dayOfWeek >= currentDayOfWeek) {
                    appointmentCounts[dayOfWeek - currentDayOfWeek] = appointmentsOnDate.length;
                } else {
                    appointmentCounts[7 - (currentDayOfWeek - dayOfWeek)] = appointmentsOnDate.length;
                }
            }
            return appointmentCounts;
        };

        const generateDayLabels = () => {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const todayIndex = new Date().getDay();
            const labels = [];
            for (let i = todayIndex; i < todayIndex + 7; i++) {
                labels.push(days[i % 7] + '(day ' + i + ')');
            }
            return labels;
        };

        const appointmentDataset = {
            labels: generateDayLabels(),
            datasets: [{
                label: 'Appointments',
                data: generateAppointmentData(),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            }]
        };

        const ctx = chartRef.current.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: appointmentDataset,
            options: {
                // plugins: [ChartDataLabels],
                responsive: true,
                maintainAspectRatio: false
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
        if (countStaff.length === 0 || countPatient.length === 0 || countDevice.length === 0 || countMedicine.length === 0) return;

        const ctx = chartRef.current.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [''],
                datasets: [{
                    label: 'Staffs',
                    data: [countStaff.length],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)'
                }, {
                    label: 'Patients',
                    data: [countPatient.length],
                    backgroundColor: 'rgba(255, 99, 132, 0.5)'
                }, {
                    label: 'Devices',
                    data: [countDevice.length],
                    backgroundColor: 'rgba(255, 206, 86, 0.5)'
                }, {
                    label: 'Medicines',
                    data: [countMedicine.length],
                    backgroundColor: 'rgba(153, 102, 255, 0.5)'
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

