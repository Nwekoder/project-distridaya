import {atom, useAtom} from 'jotai'
import {ArrowDownRight, PlusIcon, Settings2Icon} from 'lucide-react'
import { useEffect, useState } from 'react'

const SupplierAddWindowAtom = atom(false)

export default function SupplierPage() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('http://localhost:8086/entity/supplier', {
            method: "GET",
            headers: {
                "X-TDP-Authtoken": localStorage.getItem("authtoken"),
            }
        }).then(res => {
            if(res.ok) return res.json()
        })
    }, [data])

    return (
        <div className="w-full px-4 pt-8 pb-4">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className='px-4 py-2 text-sm font-medium bg-gray-800 first:rounded-tl-lg last:rounded-tr-lg whitespace-nowrap'>Nama</th>
                            <th className='px-4 py-2 text-sm font-medium bg-gray-800 first:rounded-tl-lg last:rounded-tr-lg whitespace-nowrap'>NPWP</th>
                            <th className='px-4 py-2 text-sm font-medium bg-gray-800 first:rounded-tl-lg last:rounded-tr-lg whitespace-nowrap'>Alamat</th>
                            <th className='px-4 py-2 text-sm font-medium bg-gray-800 first:rounded-tl-lg last:rounded-tr-lg whitespace-nowrap'>No. HP</th>
                            <th className='px-4 py-2 text-sm font-medium bg-gray-800 first:rounded-tl-lg last:rounded-tr-lg whitespace-nowrap'>Email</th>
                            <th className='px-4 py-2 text-sm font-medium bg-gray-800 first:rounded-tl-lg last:rounded-tr-lg whitespace-nowrap'>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map(d => (
                            <tr key={d._id} className='border-b border-gray-700 border-opacity-25 last:border-0'>
                                <td className="px-4 py-2 text-sm whitespace-nowrap">{d.name}</td>
                                <td className="px-4 py-2 text-sm whitespace-nowrap">{d.npwp}</td>
                                <td className="px-4 py-2 text-sm whitespace-nowrap">{d.address}</td>
                                <td className="px-4 py-2 text-sm whitespace-nowrap">{d.phone}</td>
                                <td className="px-4 py-2 text-sm whitespace-nowrap">{d.email || ''}</td>
                                <td className="flex items-center justify-center px-4 py-2 text-sm whitespace-nowrap">
                                    <button type="button" className="flex items-center justify-center p-0 transition-[background] hover:bg-gray-900 size-8 btn">
                                        <Settings2Icon className='size-4' />
                                    </button>
                                </td>
                            </tr>
                        ))}              
                    </tbody>
                </table>
            </div>

            <SupplierAddWindow />
        </div>
    )
}

function SupplierAddWindow() {
    const [open, setOpen] = useAtom(SupplierAddWindowAtom)
    
    return (
        <>
            {open ? (
                <div className="fixed p-4 origin-bottom-right bg-gray-900 rounded-md bottom-4 right-4 w-80 h-3/4">
                    <button onClick={() => setOpen(false)} type="button" className="absolute flex items-center justify-center text-xs bg-gray-900 border rounded-full border-gray-50 -top-3 -left-3 size-8">
                        <ArrowDownRight className='size-4' />
                    </button>
                    
                    SupplierAddWindow
                </div>
            ) : (
                <button type="button" onClick={() => setOpen(true)} className="fixed flex items-center justify-center text-xl font-bold bg-blue-800 transition-[background] rounded-full bottom-4 right-4 size-12">
                    <PlusIcon />
                </button>
            )}
        </>
    )
}