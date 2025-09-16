'use client'

import Image from "next/image";
import Seat from "@/app/components/Seat";
import {useState} from "react";
import groupCkp from "@/app/utils/randomizer";
import NAMES, {CKP} from "@/app/utils/names";

export default function Home() {
    const [names, setNames] = useState<CKP[][]>([])

    const randomizeNames = () => {
        setNames(groupCkp(NAMES))
    }

    const renderEmpty = () => {
        return <>
            <div className="flex lg:space-x-4 space-x-2 items-center justify-end lg:mb-8 mb-6 w-full ">
                <Seat/>
                <Seat/>
                <Seat/>
                <Seat/>
            </div>
            <div className="flex lg:space-x-4 space-x-2 items-center justify-start lg:mb-8 mb-6 w-full ">
                <Seat/>
                <Seat/>
                <Seat/>
                <Seat/>
            </div>
            <div className="flex lg:space-x-4 space-x-2 items-center justify-end lg:mb-8 mb-6 w-full ">
                <Seat/>
                <Seat/>
                <Seat/>
                <Seat/>
            </div>
            <div className="flex lg:space-x-4 space-x-2 items-center justify-start lg:mb-8 mb-6 w-full">
                <Seat/>
                <Seat/>
                <Seat/>
                <Seat/>
            </div>
            <div className="flex lg:space-x-4 space-x-2 items-center justify-end lg:mb-8 mb-6 w-full ">
                <Seat/>
                <Seat/>
                <Seat/>
                <Seat/>
            </div>
            <div className="flex lg:space-x-4 space-x-2 items-center justify-start lg:mb-8 mb-6 w-full">
                <Seat/>
                <Seat/>
                <Seat/>
                <Seat/>
            </div>
            <div className="flex lg:space-x-4 space-x-2 items-center justify-end lg:mb-8 mb-6 w-full ">
                <Seat/>
                <Seat/>
                <Seat/>
                <Seat/>
            </div>
            <div className="flex lg:space-x-4 space-x-2 items-center justify-start lg:mb-8 mb-6 w-full">
                <Seat/>
                <Seat/>
                <Seat/>
                <Seat/>
            </div>
            <div className="flex lg:space-x-4 space-x-2 items-center justify-end lg:mb-8 mb-6 w-full ">
                <Seat/>
                <Seat/>
                <Seat/>
                <Seat/>
            </div>
            <div className="flex lg:space-x-4 space-x-2 items-center justify-start lg:mb-8 mb-6 w-full">
                <Seat/>
                <Seat/>
                <Seat/>
                <Seat/>
            </div>
            <div className="flex lg:space-x-4 space-x-2 items-center justify-end lg:mb-8 mb-6 w-full ">
                <Seat/>
                <Seat/>
                <Seat/>
            </div>
            <div className="flex lg:space-x-4 space-x-2 items-center justify-start lg:mb-8 mb-6 w-full">
                <Seat/>
                <Seat/>
                <Seat/>
            </div>
        </>
    }

    const renderNames = () => {
        return names.map((groupedNames, index) => {
            return <div className="flex-1" key={index}>
                <div
                    className={`flex lg:space-x-4 space-x-2 items-center ${index % 2 === 0 ? 'justify-end' : 'justify-start'} lg:mb-8 mb-6 w-full`}>
                    {groupedNames.map((ckp) => <Seat name={ckp.name} key={ckp.id}/>)}
                </div>
            </div>
        })
    }

    return (
        <div>
            <header className="p-4">
                <div className="flex items-center justify-between">
                    <h1 className="font-semibold text-gray-900 lg:text-lg">
                        CKP 2025 - Seat Randomizer
                    </h1>
                    <div className="flex items-center justify-end space-x-4">
                        <div className="h-4 lg:h-10 relative">
                            <Image src="/assets/danantara.png" width={960} height={330} alt="Logo Danantara"
                                   className="w-auto h-full"/>
                        </div>
                        <div className="h-4 lg:h-10 relative">
                            <Image src="/assets/ptpn3.png" width={960} height={330} alt="Logo Danantara"
                                   className="w-auto h-full"/>
                        </div>
                        <div className="h-4 lg:h-10 relative">
                            <Image src="/assets/ptpn1.png" width={960} height={330} alt="Logo Danantara"
                                   className="w-auto h-full"/>
                        </div>
                    </div>
                </div>
            </header>
            <main className="mt-8 mx-8 lg:mt-16 lg:mx-64">
                <div className="flex items-center justify-center">
                    <button type="button" onClick={randomizeNames}
                            className="inline-block mb-16 mx-auto rounded-lg bg-green-500 text-white p-4 cursor-pointer text-sm">
                        Randomize Seat
                    </button>
                </div>
                <div
                    className="rounded border border-gray-500 w-64 lg:w-96 h-6 mx-auto flex items-center justify-center text-sm lg:mb-16 mb-8">
                    Projector
                </div>
                <div className="mx-32 grid grid-cols-2 lg:gap-x-16 gap-x-8">
                    {names.length === 0 ? renderEmpty() : renderNames()}
                </div>
            </main>
        </div>
    );
}
