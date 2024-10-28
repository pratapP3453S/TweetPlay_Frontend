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

