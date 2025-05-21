import React, { useState } from 'react'
import PaymentCard from '../../../../../components/paymentcard/PaymentCard';

import Card from '../../../../../assets/card.png'
import Bancaire from '../../../../../assets/bancaire.png'
import { FaPlus } from "react-icons/fa6";


const Payment = () => {

    const [selectedPaymentMethode, setSelectedPaymentMhethose] = useState('');


    const handelChange = (e) => {
        setSelectedPaymentMhethose(e.target.value);
    }
    return (
        <div className='w-full space-y-3'>
            <h6 className="text-sm text-neutral-600 font-medium">
                Select Payment Methode
            </h6>


            <div className="w-full grid grid-cols-2 gap-10">
                <PaymentCard
                    selectedPayment={selectedPaymentMethode}
                    value={"card"}
                    onChange={handelChange}
                    cardholderName={" EDAHABIA Card"}
                    cardNumber={"8888"}
                    cardImage={Card}
                />
                <PaymentCard
                    selectedPayment={selectedPaymentMethode}
                    value={"bancaire"}
                    onChange={handelChange}
                    cardholderName={" BANK Card "}
                    cardNumber={"8999"}
                    cardImage={Bancaire}
                />

            </div>

            <div className="w-full flex justify-end">
                <div className="w-fit flex items-center justify-center gap-x-2 
                cursor-pointer text-base font-normal text-primary">

                    <FaPlus />
                    <p className="capitalize">
                        Add new card
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Payment