const Footer = () => {
  return (
    <footer className="font-serif bg-gray-800 text-white p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-semibold relative">
            CHEVALIER
            <hr className="border-b-2 w-1/4 mx-auto my-3" />
          </h1>
          <p className="mt-3 text-center">
            Chevalier là một Vietnamese local brand được <br /> thành lập tại
            Thái Nguyên vào cuối năm 2023.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-semibold relative">
            THÔNG TIN
            <hr className="border-b-2 w-1/4 mx-auto  my-3" />
          </h1>
          <p className="mt-3 text-center">
            <a href="/your-new-route">Shiping & Đổi trả</a>
          </p>
        </div>
      </div>

      <div className="text-center mt-8 ">
        &copy; {new Date().getFullYear()} Chevalier, Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
