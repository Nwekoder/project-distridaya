import {atom, useAtom} from 'jotai'
import {ArrowDownRight, EditIcon, LoaderCircle, PlusIcon, TrashIcon} from 'lucide-react'
import { useEffect, useState } from 'react'

const SupplierAddWindowAtom = atom(false)
const SupplierDeleteDialogAtom = atom(false)
const SupplierEditWindowAtom = atom(false)

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
        }).then(json => {
            setData(json.data)
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
                                <td className="px-4 py-2 text-sm text-center whitespace-nowrap">{d.npwp || '-'}</td>
                                <td className="px-4 py-2 text-sm">{d.address}</td>
                                <td className="px-4 py-2 text-sm whitespace-nowrap">{d.phone}</td>
                                <td className="px-4 py-2 text-sm text-center whitespace-nowrap">{d.email || '-'}</td>
                                <td className="flex items-center justify-center gap-2 px-4 py-2 text-sm whitespace-nowrap">
                                    <button type="button" className="flex items-center peer justify-center p-0 transition-[background] hover:bg-gray-900 size-8 btn">
                                        <EditIcon className='size-4' />
                                    </button>
                                    <SupplierDeleteDialog supplier_id={d._id} />
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
    const [loading, setLoading] = useState(false)
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
    
        const formData = new FormData(e.target)
        const data = JSON.parse(JSON.stringify(Object.fromEntries(formData)))

        const res = await fetch('http://localhost:8086/entity/supplier', {
            method: "POST",
            headers: {
                "X-TDP-Authtoken": localStorage.getItem("authtoken"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                npwp: data.npwp,
                city: data.city,
                address: data.address,
                phone: data.phone,
                email: data.email,
                fax: data.fax,
            })
        })

        if(res.ok) {
            e.target.reset()
            setLoading(false)
        }else {
            setLoading(false)
            const json = await res.json()
            alert(`Terjadi kesalahan! ${json.message}`)
        }
    }

    return (
        <>
            {open ? (
                <div className="fixed p-4 origin-bottom-right bg-gray-900 rounded-md bottom-4 right-4 w-80 h-3/4">
                    <button onClick={() => setOpen(false)} type="button" className="absolute flex items-center justify-center text-xs bg-gray-900 border rounded-full border-gray-50 -top-3 -left-3 size-8">
                        <ArrowDownRight className='size-4' />
                    </button>
                    
                    {loading ? (
                        <div className="flex items-center justify-center h-full px-2 py-4 overflow-hidden">
                            <LoaderCircle className='size-8 animate-spin' />
                        </div>
                    ) : (
                        <div className="flex flex-col h-full px-2 py-4 overflow-y-auto">
                            <form onSubmit={handleSubmit}>
                                <div className="text-input">
                                    <label htmlFor="name">Nama Supplier</label>
                                    <input type="text" name="name" id="name" required />
                                </div>
                                <div className="mb-8 text-input">
                                    <label htmlFor="npwp">NPWP</label>
                                    <input type="text" name="npwp" id="npwp" />
                                </div>

                                <div className="text-input">
                                    <label htmlFor="city">Kota</label>
                                    <input type="text" name="city" id="city" required />
                                </div>
                                <div className="mb-8 text-input">
                                    <label htmlFor="address">Alamat</label>
                                    <input type="text" name="address" id="address" required />
                                </div>

                                <div className="text-input">
                                    <label htmlFor="phone">Phone</label>
                                    <input type="tel" name="phone" id="phone" required />
                                </div>
                                <div className="text-input">
                                    <label htmlFor="email">E-Mail</label>
                                    <input type="email" name="email" id="email" />
                                </div>
                                <div className="mb-10 text-input">
                                    <label htmlFor="email">Fax</label>
                                    <input type="tel" name="fax" id="fax" />
                                </div>

                                <button type="submit" className="bg-blue-800 btn">Save</button>
                            </form>
                        </div>
                    )}
                </div>
            ) : (
                <button type="button" onClick={() => setOpen(true)} className="fixed flex items-center justify-center text-xl font-bold bg-blue-800 transition-[background] rounded-full bottom-4 right-4 size-12">
                    <PlusIcon />
                </button>
            )}
        </>
    )
}

function SupplierDeleteDialog({supplier_id}) {
    const [open, setOpen] = useAtom(SupplierDeleteDialogAtom)

    async function handleDelete() {
        const res = await fetch(`http://localhost:8086/entity/supplier/${supplier_id}`, {
            method: "DELETE",
            headers: {
                "X-TDP-Authtoken": localStorage.getItem("authtoken"),
            }
        })

        if(res.ok) {
            setOpen(false)
        }
    }

    return (
        <>
            {open ? (
                <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-neutral-900 bg-opacity-30 backdrop-blur-md">
                    <div className="p-4 bg-gray-800 rounded-md w-96">
                        <p className='mb-8'>Apakah anda yakin ingin menghapus data ini?</p>

                        <div className="flex items-center justify-evenly">
                            <button type="button" onClick={handleDelete} className="bg-red-800 btn">Ya</button>
                            <button type="button" onClick={() => setOpen(false)} className="btn">Tidak</button>
                        </div>
                    </div>
                </div>
            ) : (
                <button onClick={() => setOpen(true)} type="button" className="flex items-center peer justify-center p-0 transition-[background] hover:bg-red-900 size-8 btn">
                    <TrashIcon className='size-4' />
                </button>
            )}
        </>
    )
}