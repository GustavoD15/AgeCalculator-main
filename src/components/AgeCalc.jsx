// Compoente: AgeCalc
// Descrição: Componente que calcula a idade com base na data de nascimento fornecida pelo usuário. Ele valida a entrada e exibe a idade em anos, meses e dias.
import { useState } from 'react';
import { useAgeCalc } from '../hooks/useAgeCalc';

const AgeCalc = () => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [errors, setErrors] = useState({
        day: '',
        month: '',
        year: '',
    });
    const { age, calculateAge } = useAgeCalc();

    const validateInputs = () => {
        const newErrors = { day: '', month: '', year: '' };
        const currentDate = new Date();
        const inputDate = new Date(year, month - 1, day);

        if (!day || day < 1 || day > 31) {
            newErrors.day = 'Deve ser um dia válido';
        }

        if (!month || month < 1 || month > 12) {
            newErrors.month = 'Deve ser um mês válido';
        }

        if (!year) {
            newErrors.year = 'Deve ser um ano válido';
        }

        if (day && month && year) {
            const date = new Date(year, month - 1, day);
            if (
                date.getDate() !== parseInt(day) ||
                date.getMonth() + 1 !== parseInt(month) ||
                date.getFullYear() !== parseInt(year)
            ) {
                newErrors.day = 'Deve ser uma data válida';
            }
        }

        if (inputDate > currentDate) {
            const diffInYears =
                inputDate.getFullYear() - currentDate.getFullYear();
            const diffInMonths =
                (inputDate.getFullYear() - currentDate.getFullYear()) * 12 +
                (inputDate.getMonth() - currentDate.getMonth());
            const diffInDays = Math.floor(
                (inputDate - currentDate) / (1000 * 60 * 60 * 24)
            );

            if (diffInYears >= 1) {
                newErrors.year = 'O ano não pode estar no futuro';
            } else if (diffInMonths >= 1) {
                newErrors.month = 'O mês não pode estar no futuro';
            } else if (diffInDays > 0) {
                newErrors.day = 'O dia não pode estar no futuro';
            }
        }

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };

    const handleCalculate = () => {
        if (validateInputs()) {
            calculateAge(day, month, year);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#ffffff] flex items-center justify-center font-poppins">
            <div className="bg-white p-8 rounded-3xl rounded-br-[100px] shadow-xl max-w-[600px] w-full mx-4">
                <div className="grid grid-cols-3 gap-4 mb-8 md:w-3/4">
                    <div className="relative">
                        <label
                            className={`block mb-2 text-sm font-bold tracking-[0.2em] uppercase ${
                                errors.day
                                    ? 'text-light-red'
                                    : 'text-smokey-grey'
                            }`}
                        >
                            DIA
                        </label>
                        <input
                            type="number"
                            value={day}
                            onChange={(e) => {
                                setDay(
                                    e.target.value
                                        .replace(/\D/g, '')
                                        .slice(0, 2)
                                );
                                setErrors((prev) => ({ ...prev, day: '' }));
                            }}
                            placeholder="DD"
                            className={`w-full p-3 border rounded-lg text-2xl font-bold text-off-black focus:outline-none focus:ring-1 ${
                                errors.day
                                    ? 'border-light-red focus:ring-light-red'
                                    : 'border-light-grey focus:border-purple focus:ring-purple'
                            }`}
                        />
                        {errors.day && (
                            <p className="absolute text-light-red text-xs italic mt-1 font-normal">
                                {errors.day}
                            </p>
                        )}
                    </div>

                    <div className="relative">
                        <label
                            className={`block mb-2 text-sm font-bold tracking-[0.2em] uppercase ${
                                errors.month
                                    ? 'text-light-red'
                                    : 'text-smokey-grey'
                            }`}
                        >
                            MÊS
                        </label>
                        <input
                            type="number"
                            value={month}
                            onChange={(e) => {
                                setMonth(
                                    e.target.value
                                        .replace(/\D/g, '')
                                        .slice(0, 2)
                                );
                                setErrors((prev) => ({ ...prev, month: '' }));
                            }}
                            placeholder="MM"
                            className={`w-full p-3 border rounded-lg text-2xl font-bold text-off-black focus:outline-none focus:ring-1 ${
                                errors.month
                                    ? 'border-light-red focus:ring-light-red'
                                    : 'border-light-grey focus:border-purple focus:ring-purple'
                            }`}
                        />
                        {errors.month && (
                            <p className="absolute text-light-red text-xs italic mt-1 font-normal">
                                {errors.month}
                            </p>
                        )}
                    </div>

                    <div className="relative">
                        <label
                            className={`block mb-2 text-sm font-bold tracking-[0.2em] uppercase ${
                                errors.year
                                    ? 'text-light-red'
                                    : 'text-smokey-grey'
                            }`}
                        >
                            ANO
                        </label>
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => {
                                setYear(
                                    e.target.value
                                        .replace(/\D/g, '')
                                        .slice(0, 4)
                                );
                                setErrors((prev) => ({ ...prev, year: '' }));
                            }}
                            placeholder="AAAA"
                            className={`w-full p-3 border rounded-lg text-2xl font-bold text-off-black focus:outline-none focus:ring-1 ${
                                errors.year
                                    ? 'border-light-red focus:ring-light-red'
                                    : 'border-light-grey focus:border-purple focus:ring-purple'
                            }`}
                        />
                        {errors.year && (
                            <p className="absolute text-light-red text-xs italic mt-1 font-normal">
                                {errors.year}
                            </p>
                        )}
                    </div>
                </div>

                <div className="relative mb-8">
                    <hr className="border-light-grey" />
                    <button
                        onClick={handleCalculate}
                        className="absolute right-0 -top-8 bg-purple hover:bg-off-black transition-colors p-4 rounded-full"
                    >
                        <img
                            src="../images/icon-arrow.svg"
                            alt="Ícone de seta"
                            className="w-8 h-8 object-contain"
                        />
                    </button>
                </div>

                <div className="text-5xl md:text-6xl font-extrabold italic">
                    <div className="mb-2">
                        <span className="text-purple">{age.years || '--'}</span>{' '}
                        <span className="text-off-black">anos</span>
                    </div>
                    <div className="mb-2">
                        <span className="text-purple">
                            {age.months || '--'}
                        </span>{' '}
                        <span className="text-off-black">meses</span>
                    </div>
                    <div>
                        <span className="text-purple">{age.days || '--'}</span>{' '}
                        <span className="text-off-black">dias</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgeCalc;
