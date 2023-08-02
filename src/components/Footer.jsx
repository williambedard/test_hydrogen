export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="flex items-center justify-between p-4 md:py-8 md:px-8 max-w-7xl mx-auto"
    >
      <p className="text-gray-600">© 2021 Shopify</p>
      <div>{/* TODO: Payment icons */}</div>
      <p className="text-gray-400">Powered by Shopify</p>
    </footer>
  );
}
