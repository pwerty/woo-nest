import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface SignupFormProps {
    onSignupSuccess: (token: string, user: any) => void;
}

function SignupForm({ onSignupSuccess}: SignupFormProps) {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if(formData.password !== formData.confirmPassword) {
            setError('비밀번호 미일치!');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/auth/signup', {
                email: formData.email,
                name: formData.name,
                password: formData.password,
            });

            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            onSignupSuccess(response.data.access_token, response.data.user);
        } catch (error:any) {
            setError(error.response?.data?.message || '가입 실패! ');
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              새 계정 만들기
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              또는{' '}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                기존 계정으로 로그인
              </Link>
            </p>
          </div>
    
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}
    
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    이름
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="홍길동"
                    />
                  </div>
                </div>
    
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    이메일
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>
    
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    비밀번호
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="최소 6자 이상"
                    />
                  </div>
                </div>
    
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    비밀번호 확인
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="비밀번호를 다시 입력하세요"
                    />
                  </div>
                </div>
    
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {isLoading ? '가입 중...' : '회원가입'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
    
    export default SignupForm;