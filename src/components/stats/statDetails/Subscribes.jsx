import React from 'react'
import GuestComponent from '../../GuestPages/GuestComponent'
import { MdIncompleteCircle } from 'react-icons/md'

function Subscribes() {
  return (
    <div className='text-white'>
                                    <GuestComponent
                        icon={
                            <span className="w-full h-full flex items-center p-4">
                                <MdIncompleteCircle className="w-32 h-32" />
                            </span>
                        }
                        title="Work in Progress..."
                        subtitle="Soon the functionalities will be availabe after update."
                        guest={false}
                    />
    </div>
  )
}

export default Subscribes
