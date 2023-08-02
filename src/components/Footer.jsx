export default function Footer() {
  return (
    <footer role="contentinfo">
      <div className="bg-white border-t border-b border-gray-300 border-solid">
        <ul className="p-12 md:py-10 md:px-4 grid grid-rows-3 grid-cols-1 md:grid-cols-3 md:grid-flow-col md:grid-rows-2 gap-3 max-w-7xl mx-auto text-gray-600">
          <li>
            <a href="/">Store home</a>
          </li>
          <li>
            <a href="/collections">Collections</a>
          </li>
          <li>
            <a
              href="/"
              className="flex items-center"
              target="_blank"
              rel="noreferrer"
            >
              <span className="mr-2">
                H<sub>2</sub> documentation
              </span>
              <ExternalIcon />
            </a>
          </li>
          <li>
            <a
              href="/"
              className="flex items-center"
              target="_blank"
              rel="noreferrer"
            >
              <span className="mr-2">Starter template</span>
              <ExternalIcon />
            </a>
          </li>
          <li>
            <a
              href="/graphiql"
              className="flex items-center"
              target="_blank"
              rel="noreferrer"
            >
              <span className="mr-2">GraphiQL editor</span>
              <ExternalIcon />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/shopify/h2-external"
              className="flex items-center"
              target="_blank"
              rel="noreferrer"
            >
              <span className="mr-2">Project H2 on Github</span>
              <ExternalIcon />
            </a>
          </li>
        </ul>
      </div>
      <div className="p-8 md:px-4 max-w-7xl mx-auto text-gray-600 font-medium">
        <p>© Unite 2020</p>
      </div>
    </footer>
  );
}

function ExternalIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-gray-400"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
    </svg>
  );
}
