// import React from 'react'

// import { useState } from 'react'
// import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

// function PremiumComponent() {
//     const [open, setOpen] = useState(true)

//     return (
//         <Dialog open={open} onClose={setOpen} className="relative z-10">
//             {/* <DialogBackdrop
//         transition
//         className="fixed inset-1 bg-gray-500 blur-lg bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
//       /> */}
//             <DialogBackdrop
//                 transition
//                 className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
//             />


//             <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//                 <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//                     <DialogPanel
//                         transition
//                         className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
//                     >
//                         <div className="bg-gray-900 text-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
//                             <div className="sm:flex sm:items-start">
//                                 <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
//                                     <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
//                                 </div>
//                                 <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
//                                     <DialogTitle as="h3" className="text-base font-semibold leading-6 text-white-900">
//                                         <span className='text-red-600'>Tweet</span>
//                                         <span>Play</span>
//                                     </DialogTitle>
//                                     <div className="mt-2">
//                                         <p className="text-sm text-white-500">
//                                             Are you sure you want to deactivate your account? All of your data will be permanently removed.
//                                             This action cannot be undone.
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
//                             <button
//                                 type="button"
//                                 onClick={() => setOpen(false)}
//                                 className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
//                             >
//                                 Deactivate
//                             </button>
//                             <button
//                                 type="button"
//                                 data-autofocus
//                                 onClick={() => setOpen(false)}
//                                 className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </DialogPanel>
//                 </div>
//             </div>
//         </Dialog>
//     )
// }

// export default PremiumComponent

import React, { useEffect, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Logo from '../Logo';
import { useDispatch, useSelector} from "react-redux";
import { getPaymentStats } from '../../hooks/getPaymentStats';
import { Navigate, NavLink, Link } from 'react-router-dom';

function PremiumComponent() {
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);
    const authStatus = useSelector((state) => state.auth.status);

    const handlePayment = () => {
        setOpen(false);
        dispatch(getPaymentStats(userData));
    }
    const handleCancel = () => {
        setOpen(false);
        <Navigate to={`/`} />
    }

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            {/* DialogBackdrop with smoother blackish blur */}
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-black bg-opacity-0 backdrop-blur-sm transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 flex items-center justify-center">
                <DialogPanel
                    transition
                    className="relative w-full max-w-3xl backdrop-blur-sm transform overflow-hidden rounded-lg bg-gray-900 text-center shadow-xl transition-all p-6 sm:w-3/5"
                >
                    <div className="bg-gray-800 text-white px-4 pb-4 pt-5 mb-10 mt-6">
                        {/* <div className="flex justify-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                                <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                            </div>
                        </div> */}
                        <Logo premium={"Premium"}/>
                        <div className="mt-3">
                            <div className="mt-2">
                                <p className="text-sm text-gray-400">
                                    Get a Smooth and Ad-Free content and Videos, Get Access to Tweets -- What's happening in the Society and contribute your speech to others.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-6 flex justify-center space-x-4">
                    <Link to={`/`}
                            // type="button"
                            // onClick={handleCancel}
                            className="inline-flex w-48 justify-center rounded-md bg-gray-700 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-gray-600"
                        >
                            Cancel
                        </Link>
                        {
                            authStatus
                        }
                        <button
                            type="button"
                            onClick={handlePayment}
                            className="inline-flex w-48 justify-center rounded-md bg-red-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-red-500"
                        >
                            ₹99/-
                        </button>

                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default PremiumComponent;

