import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { GiKiwiFruit } from "react-icons/gi";
import { FaDisease } from "react-icons/fa6";



const Content = () => {
    return (
        <div className="relative isolate overflow-hidden bg-white px-6 py-24 mt-2 sm:py-32 lg:overflow-visible lg:px-0">
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <svg
                    className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-green-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                            width={200}
                            height={200}
                            x="50%"
                            y={-1}
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M100 200V.5M.5 .5H200" fill="none" />
                        </pattern>
                    </defs>
                    <svg x="50%" y={-1} className="overflow-visible fill-green-50">
                        <path
                            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                            strokeWidth={0}
                        />
                    </svg>
                    <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
                </svg>
            </div>
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="lg:max-w-lg">
                            <p className="text-base font-semibold leading-7 text-green-600">About</p>
                            <h1 className="mt-2 text-7xl font-bold tracking-tight text-gray-900 sm:text-7xl" 
                            style={{
                                color: "#58B741",
                                fontFamily: "League Spartan",
                                textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
                            }}>Kaalaman-si</h1>
                            {/* <p className="mt-6 text-xl leading-8 text-gray-700">
                                Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam
                                eget aliquam. Quisque id at vitae feugiat egestas.
                            </p> */}
                        </div>
                    </div>
                </div>
                <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                    <img
                        className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                        src="./images/fruit-bg.jpg"
                        alt=""
                    />
                </div>
                <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    <div className="lg:pr-4">
                        <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                            <p>
                            Kaalaman-si is a platform dedicated to predictive analysis in urban farming, specifically focusing on the growth of Kalamansi. 
                            Established from the study titled "Predictive Analysis of Kalamansi Growth: Assessing Quality and Disease Markers in Urban 
                            Farming for Home Gardeners," our website addresses the challenges faced by cultivators in ensuring optimal quality and 
                            identifying disease risks.
                            </p>
                            <ul role="list" className="mt-8 space-y-8 text-gray-600">
                                <li className="flex gap-x-3">
                                    <GiKiwiFruit className="mt-1 h-5 w-5 flex-none text-green-600" aria-hidden="true"/>
                                    {/* <CloudArrowUpIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" /> */}
                                    <span>
                                        <strong className="font-semibold text-gray-900">Predict Quality.</strong> Environmental factors, fruit appearance, and cultivation practices were collected from home gardeners to train a logistic regression model with an accuracy of 95%.
                                    </span>
                                </li>
                                <li className="flex gap-x-3">
                                    <FaDisease className="mt-1 h-5 w-5 flex-none text-green-600" aria-hidden="true"/>
                                    {/* <LockClosedIcon className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true" /> */}
                                    <span>
                                        <strong className="font-semibold text-gray-900">Predict Disease.</strong> Visual symptoms and cultivation practices were collected from home gardeners to train a logistic regression model with an accuracy of 92%.
                                    </span>
                                </li>
                            </ul>
                            <p className="mt-8 al">
                            Our research aims to provide a comprehensive predictive analysis framework using logistic regression models. With our web application as a tool, we offer prediction results and personalized recommendations to aid cultivators in making informed decisions, thus enhancing the efficiency and productivity of urban farming methods.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Content