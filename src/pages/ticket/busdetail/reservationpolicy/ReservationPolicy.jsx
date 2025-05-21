import React from 'react'

const ReservationPolicy = () => {
    return (
        <div className='col-span-4 w-full border-l border-neutral-300 pl-5'>
            <div className="w-full space-y-3 text-left">
                <h1 className='text-lg text-neutral-600 font-medium text-start'>
                    Reservation Policies
                </h1>

                <ul className='w-full list-disc list-outside space-y-2.5 px-4'>

                    <li className="text-sm text-neutral-500 font-normal">
                        {/* يُرجى ملاحظة أن الحجز غير قابل للاسترجاع بعد التأكيد */}

                        Please note that the reservation is non-refundable once confirmed.

                    </li>

                    <li className="text-sm text-neutral-500 font-normal">
                        {/* يجب على الزبون الاحتفاظ بمعلومات الحجز حتى نهاية الرحلة؛
                          وفي حال عدم إثبات الحجز، قد يُطلب دفع جديد */}

                        Passengers must keep the reservation details until the end of the trip;
                        in case of missing proof of booking, a new payment may be required.

                    </li>

                    <li className="text-sm text-neutral-500 font-normal">
                        {/*  يمكن إلغاء الحجز قبل 24 ساعة
                         من موعد الانطلاق مع خصم 50% من المبلغ المدفوع */}

                        Cancellations can be made up to 24 hours before the departure time,
                        with a 50% cancellation fee.
                    </li>

                    <li className="text-sm text-neutral-500 font-normal">
                        {/* قد يتم إلغاء أو تأجيل الرحلة بسبب ظروف قاهرة
                         أو أحوال جوية أو أسباب تقنية غير متوقعة */}

                        The trip may be cancelled or delayed due to force majeure,
                        weather conditions, or unexpected technical issues.
                    </li>

                    <li className="text-sm text-neutral-500 font-normal">
                        {/*   يجب على الزبون التواجد في نقطة الانطلاق قبل 30 دقيقة على الأقل من الموعد المحدد، ولا تتحمل الشركة مسؤولية التأخير
                         أو فوات الرحلة بسبب التأخر في الوصول*/}

                        Passangers must arrive at the departure point at least 30 minutes before the scheduled time.
                        The company is not responsible for missed trips due to late arrival.
                    </li>

                </ul>
            </div>

        </div>
    )
}

export default ReservationPolicy