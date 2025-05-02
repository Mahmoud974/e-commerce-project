import React from "react";

export default function HelpSection() {
  const helpItems = [
    {
      title: "Nous contacter",
      image:
        "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/sign/element-page-img/logo-mockup.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzFjMmFkYWJkLTY5YWYtNGI0ZC04MmJiLTRiMWNjZWJhM2Y2NSJ9.eyJ1cmwiOiJlbGVtZW50LXBhZ2UtaW1nL2xvZ28tbW9ja3VwLnBuZyIsImlhdCI6MTc0NjE2MjczMSwiZXhwIjoyMDYxNTIyNzMxfQ.uBLhFPaPJ3cHY3KWuCk8H1E1KFZsbL_MvS4ao5r8keE",
      link: "/contact",
    },
    {
      title: "Délai de livraison",
      image:
        "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/sign/element-page-img/delivery1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzFjMmFkYWJkLTY5YWYtNGI0ZC04MmJiLTRiMWNjZWJhM2Y2NSJ9.eyJ1cmwiOiJlbGVtZW50LXBhZ2UtaW1nL2RlbGl2ZXJ5MS5wbmciLCJpYXQiOjE3NDYxNjI3NzQsImV4cCI6MjA2MTUyMjc3NH0.999WH4vgtYA0WpdCKDlFkcIdyOoSEuBXuoDTfubo6Hs",
      link: "/delivery",
    },
    {
      title: "Entretien des meubles",
      image:
        "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/sign/element-page-img/cleanSofa2.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzFjMmFkYWJkLTY5YWYtNGI0ZC04MmJiLTRiMWNjZWJhM2Y2NSJ9.eyJ1cmwiOiJlbGVtZW50LXBhZ2UtaW1nL2NsZWFuU29mYTIuanBnIiwiaWF0IjoxNzQ2MTYyODE4LCJleHAiOjIwNjE1MjI4MTh9.yn6nitM2_CSQ74WC8-Cs6RA75Y2sJOuy3f19VzZq8Bw",
      link: "/product-interviews",
    },
    {
      title: "Instructions d’assemblage",
      image:
        "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/sign/element-page-img/instruction.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzFjMmFkYWJkLTY5YWYtNGI0ZC04MmJiLTRiMWNjZWJhM2Y2NSJ9.eyJ1cmwiOiJlbGVtZW50LXBhZ2UtaW1nL2luc3RydWN0aW9uLmpwZyIsImlhdCI6MTc0NjE2Mjg0NiwiZXhwIjoyMDYxNTIyODQ2fQ.b_MYGWUxX7ugTZkWnc8-6e620Hn0wKIv0u_1RWN5Dvo",
      link: "/assembly-instructions",
    },
    {
      title: "Garantie",
      image:
        "https://pejotrvfcsqfdakpnqil.supabase.co/storage/v1/object/sign/element-page-img/guarantie.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzFjMmFkYWJkLTY5YWYtNGI0ZC04MmJiLTRiMWNjZWJhM2Y2NSJ9.eyJ1cmwiOiJlbGVtZW50LXBhZ2UtaW1nL2d1YXJhbnRpZS5qcGciLCJpYXQiOjE3NDYxNjI4OTIsImV4cCI6MjA2MTUyMjg5Mn0.S594iumf7a7dZ4URv2yIqNiijBrWi-1S7tBAePnnTSc",
      link: "/conditions-guarantee",
    },
  ];

  return (
    <section className="py-12">
      <h2 className="text-center text-2xl font-bold mb-8 lg:px-0 px-5">
        Comment pouvons-nous vous aider ?
      </h2>

      {/* Grid for all screen sizes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto px-4">
        {helpItems.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="flex cursor-pointer flex-col lg:px-0 px-5 items-center text-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-lg shadow-md mb-4"
            />
            <h3 className="text-lg font-semibold">{item.title}</h3>
          </a>
        ))}
      </div>
    </section>
  );
}
