import './tailwind.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>NextJS 13</title>
        <meta name="viewport" content="width=500, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  )
}
