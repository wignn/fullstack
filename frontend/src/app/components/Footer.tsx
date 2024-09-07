
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-sm">&copy; {new Date().getFullYear()} Website Anda. All rights reserved.</p>
          </div>

          {/* Links */}
          <div className="flex space-x-6 justify-center">
            <a href="/privacy" className="text-sm hover:text-gray-300">Privacy Policy</a>
            <a href="/terms" className="text-sm hover:text-gray-300">Terms of Service</a>
            <a href="/contact" className="text-sm hover:text-gray-300">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
