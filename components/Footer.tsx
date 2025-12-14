"use client"

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 gap-4">
          <p>© 2023 Hostify, Inc. All Rights Reserved</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-gray-900 transition">Privacy Policy</Link>
            <Link href="/" className="hover:text-gray-900 transition">Terms & Conditions</Link>
            <Link href="/" className="hover:text-gray-900 transition">Contact us</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}