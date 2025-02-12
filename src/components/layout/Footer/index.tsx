import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-white mt-auto">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-[#005EB8] mb-4">Medicare PlanIt</h3>
            <p className="text-gray-600 max-w-xs">
              Land on the right Medicare plan with our guided questionnaire.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#005EB8] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-[#005EB8]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/questionnaire" className="text-gray-600 hover:text-[#005EB8]">
                  Get Started
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-[#005EB8]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-[#005EB8] mb-4">Contact Us</h3>
            <p className="text-gray-600 mb-2">Need help? Call Jenny:</p>
            <a href="tel:1-800-867-5309" className="text-[#005EB8] font-semibold text-lg">
              1-800-867-5309
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Medicare PlanIt. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-500 hover:text-[#005EB8] text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-[#005EB8] text-sm">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
