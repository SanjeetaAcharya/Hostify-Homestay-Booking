import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-4 gap-8">
          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Help Centre</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Air Cover</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Supporting people with disabilities</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Cancellation options</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Our COVID-19 Response</Link></li>
            </ul>
          </div>
          
          {/* Hosting */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Hosting</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Local home</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Cover for hosts</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Hosting resources</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Community forum</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Hosting responsibly</Link></li>
            </ul>
          </div>
          
          {/* Hostify */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Hostify</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Newsroom</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Learn about new features</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Letter from our founders</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Careers</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Investors</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Gift cards</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center text-sm text-gray-600">
          <p>© 2025 Hostify, Inc. All rights reserved</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-gray-900">Privacy Policy</Link>
            <Link href="/" className="hover:text-gray-900">Terms of Service</Link>
            <Link href="/" className="hover:text-gray-900">Cookies Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}