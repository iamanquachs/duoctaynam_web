import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const Footer_item = () => {
  const router = useRouter();
  const key = router.query;
  const loaifooter = Object.keys(key)[0];
  useEffect(() => {
    window.scroll(0, 0);
  });

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/Logo_TPSPharma_mini.png" />
      </Head>
      {(() => {
        switch (loaifooter) {
          case "pham-vi-cung-cap":
            return (
              <div id="phamvicungcap" className="phamvicungcap">
                <div className="bg_body">
                  <div className="container mx-auto py-5 mobile:py-2 tablet:py-3">
                    <div className="leading-7 mobile:px-1 whitespace-normal">
                      <h1 className="font-semibold text-2xl text-center">
                        Phạm vi cung cấp
                      </h1>
                      <p className=" pt-3">
                        Dược Tây Nam luôn sẵn sàng cung cấp sản phẩm và dịch vụ
                        từ 8h - 21h qua 2 kênh bán hàng:{" "}
                      </p>
                      <p>
                        ● Trụ sở Công ty: 135 Ngô Thì Nhậm, P. An Khánh, Q. Ninh
                        Kiều, TP. Cần Thơ
                      </p>
                      <p>● Trực tuyến: duoctaynam.vn | taynampharma.vn</p>
                      <p>
                        Không giới hạn phạm vi địa lý. Ứng dụng công nghệ nhằm
                        nâng cao trải nghiệm của khách hàng và gia tăng dịch vụ
                        chăm sóc khách hàng được tốt nhất.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          case "chinh-sach-doi-tra":
            return (
              <div id="doitra" className="doitra">
                <div className="bg_body">
                  <div className="container mx-auto py-5 mobile:py-2 tablet:py-3">
                    <div className="leading-7 mobile:px-2 text-justify">
                      <h1 className="font-semibold text-2xl text-center">
                        Chính sách đổi trả
                      </h1>
                      <h4 className="font-semibold text-xl pt-3">
                        1. Điều kiện đổi trả
                      </h4>
                      <h4 className="font-semibold text-lg pt-4">
                        1.1. Các trường hợp hỗ trợ đổi trả
                      </h4>
                      <p>Dược Tây Nam hỗ trợ đổi trả sản phẩm như sau:</p>
                      <p>
                        <ul>
                          <li>• Sản phẩm bị lỗi từ nhà sản xuất.</li>
                          <li>
                            • Sản phẩm bị hư hỏng hoặc bể vỡ trong quá trình vận
                            chuyển.
                          </li>
                          <li>
                            • Sản phẩm giao đến không đúng hoặc không đủ với đơn
                            hàng đã đặt và thỏa 2 điều kiện:
                          </li>
                          <li>
                            – Sản phẩm hoàn trả chưa qua sử dụng và còn nguyên
                            vẹn bao bì ban đầu như tem, nhãn dán, hộp, mã vạch,
                            thẻ bảo hành (nếu có), phiếu giảm giá hoặc quà tặng
                            kèm (nếu có).
                          </li>
                          <li>
                            – Sản phẩm được hoàn trả cùng với biên nhận, hóa đơn
                            hoặc biên lai thuế VAT (nếu có).
                          </li>
                        </ul>
                      </p>
                      <p>
                        Với các trường hợp trên, Dược Tây Nam hỗ trợ khách hàng
                        đổi sản phẩm đúng và nguyên vẹn, bổ sung sản phẩm còn
                        thiếu hoặc trả sản phẩm và được hoàn tiền theo mục 3.
                        Chính sách hoàn tiền.
                      </p>
                      <h4 className="font-semibold text-lg pt-4">
                        1.2. Các trường hợp không hỗ trợ đổi trả
                      </h4>
                      <p>Chính sách đổi trả không áp dụng cho trường hợp:</p>
                      <p>
                        <ul>
                          <li>
                            • Khách hàng đến trực tiếp Trụ sở Dược Tây Nam để
                            mua hàng.
                          </li>
                          <li>
                            • Các yêu cầu trả hàng hoặc hoàn tiền thuộc về cảm
                            quan/không ưng ý/thay đổi quyết định mua hàng.
                          </li>
                          <li>
                            • Các đơn hàng có sử dụng Phiếu mua hàng hoặc Phiếu
                            quà tặng (gift voucher)
                          </li>
                          <li>
                            • Các sản phẩm chỉ khác nhau về bao bì, mẫu mã bên
                            ngoài theo lô hàng của nhà sản xuất mà không có sự
                            thay đổi về thành phần, chất lượng.
                          </li>
                          <li>
                            • Các sản phẩm là mặt hàng trữ lạnh, hàng tiêm
                            chích.
                          </li>
                          <li>
                            • Các sản phẩm nằm trong các chương trình không được
                            phép đổi trả.
                          </li>
                        </ul>
                      </p>
                      <p>
                        Để tránh các trường hợp đáng tiếc có thể xảy ra, khách
                        hàng vui lòng kiểm tra kĩ đơn hàng với nhân viên giao
                        nhận hoặc dược sĩ nhà thuốc tại thời điểm nhận hàng và
                        có quyền từ chối nhận hàng nếu các sản phẩm không đúng
                        như mong đợi của quý khách. Việc đồng kiểm sản phẩm sẽ
                        hỗ trợ Dược Tây Nam xử lý nhanh chóng hơn.
                      </p>
                      <h4 className="font-semibold text-xl pt-3">
                        2. Quy trình đổi trả
                      </h4>
                      <p></p>
                      <h4 className="font-semibold text-xl pt-3">
                        3. Chính sách hoàn tiền
                      </h4>
                      <h4 className="font-semibold text-lg pt-4">
                        3.1. Giá trị hoàn trả
                      </h4>
                      <p>
                        Giá trị hoàn trả được tính bằng giá trị sản phẩm hoặc
                        đơn hàng tính tại thời điểm đơn hàng được xác nhận.
                      </p>
                      <h4 className="font-semibold text-lg pt-4">
                        3.2. Hình thức hoàn tiền
                      </h4>
                      <p>
                        Hình thức hoàn tiền tùy thuộc vào hình thức thanh toán
                        ban đầu như sau:
                      </p>
                      <p>
                        <ul>
                          <li>
                            • Chuyển khoản ngân hàng nếu thanh toán ban đầu là
                            “Thanh toán tiền mặt khi nhận hàng”. Phí chuyển
                            khoản sẽ được thanh toán bởi Dược Tây Nam.
                          </li>
                          <li>
                            • Thẻ ATM hoặc thẻ Visa (có đăng ký Internet
                            banking) nếu thanh toán ban đầu là thẻ ATM/thẻ Visa
                          </li>
                          <li>
                            • Ví Momo nếu thanh toán ban đầu thông qua Ví MoMo
                          </li>
                          <li>
                            • Ví điện tử ViettelPay nếu thanh toán ban đầu qua
                            Ví điện tử ViettelPay.
                          </li>
                        </ul>
                      </p>
                      <p>
                        Điểm thành viên, voucher hoặc coupon được sử dụng trong
                        đơn hàng hoàn trả sẽ được hoàn lại như sau:
                      </p>
                      <p>
                        <ul>
                          <li>
                            • Nếu đơn hàng có sử dụng điểm Dược Tây Nam, khi đơn
                            được xác nhận hoàn trả, Dược Tây Nam sẽ hoàn lại
                            tổng số điểm Dược Tây Nam quý khách đã dùng.
                          </li>
                          <li>
                            • Nếu đơn hàng có sử dụng voucher hoặc coupon, Dược
                            Tây Nam sẽ hoàn lại 01 lần sử dụng.
                          </li>
                        </ul>
                      </p>
                      <p>
                        Dược Tây Nam sẽ thông báo đến khách hàng qua email hoặc
                        điện thoại sau khi hoàn tất thanh toán.
                      </p>
                      <h4 className="font-semibold text-lg pt-4">
                        3.3. Thời gian hoàn tiền
                      </h4>
                      <p>
                        Tùy thuộc vào quy trình xử lý của từng ngân hàng và
                        phương thức hoàn tiền như sau:
                      </p>
                      <p>
                        <ul>
                          <li>
                            • Điểm Dược Tây Nam, voucher hoặc coupon: 1 ngày làm
                            việc kể từ thời điểm Dược Tây Nam xác nhận hủy đơn
                            hàng.
                          </li>
                          <li>
                            • Chuyển khoản ngân hàng: 7-15 ngày làm việc tùy
                            theo ngân hàng khách hàng sử dụng.
                          </li>
                          <li>
                            • Qua Ví MoMo: trong vòng 4 tiếng kể từ thời điểm
                            Dược Tây Nam xác nhận hủy đơn với quý khách
                          </li>
                          <li>• Qua ví điện tử ViettelPay:</li>
                          <li>
                            - Thanh toán bằng số dư có sẵn trong ví ViettelPay:
                            02 ngày làm việc.
                          </li>
                          <li>• Qua Thẻ Visa-Thẻ ATM:</li>
                          <li>
                            - Thanh toán bằng thẻ: 07 ngày làm việc đối với thẻ
                            nội địa, 15 ngày làm việc đối với thẻ Credit/Debit
                            tùy theo ngân hàng khách sử dụng.
                          </li>
                        </ul>
                      </p>
                      <p className="font-semibold">
                        Mọi thắc mắc về chính sách đổi trả, vui lòng liên hệ:
                      </p>
                      <p>• Hotline/Zalo: 0901 09 09 17</p>
                      <p>
                        • Zalo OA:{" "}
                        <a
                          className="hover:cursor-pointer hover:text-green-700"
                          target="_blank"
                          href="https://zalo.me/4210793912768709606?gidzl=Yigw3zZXprcEqxiDqllDM8_GlWF5hyC0m83Y1vMiaroJXRLOnwgMMvU4wWZ1hSbUdT2u3cHa74LYtERDN0"
                        >
                          cskh@duoctaynam.vn
                        </a>
                      </p>
                      <p>
                        • Facebook fanpage:{" "}
                        <a
                          className="hover:cursor-pointer hover:text-green-700"
                          target="_blank"
                          href="https://www.facebook.com/duoctaynam"
                        >
                          https://www.facebook.com/duoctaynam
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          case "chinh-sach-giao-hang":
            return (
              <div id="giaohang" className="giaohang">
                <div className="bg_body">
                  <div className="container mx-auto py-5 mobile:py-2 tablet:py-3">
                    <div className="leading-7 text-justify mobile:px-2">
                      <h1 className="text-center text-2xl font-semibold">
                        Chính sách giao hàng
                      </h1>
                      <div>
                        <h4 className="text-lg font-semibold">A. Giao hàng</h4>
                        <p className="text-sm font-semibold pt-4">
                          1. Dược Tây Nam có giao hàng thuốc không?
                        </p>
                        <p>
                          – <span className="italic">Thuốc không kê đơn</span>:
                          Quý khách có thể đặt thuốc không kê đơn trực tuyến qua
                          trang web duoctaynam.vn hoặc trên kênh Zalo OA hoặc
                          Facebook Fanpage.
                        </p>
                        <p>
                          Thuốc không kê đơn chỉ bán trực tuyến theo đơn vị
                          hộp/lọ/chai chứ không bán lẻ theo đơn vị viên/vỉ/gói…
                          nhằm đảm bảo chất lượng thuốc trong khi quá trình vận
                          chuyển. Để mua lẻ viên/vỉ/gói…, quý khách vui lòng mua
                          trực tiếp tại nhà thuốc Dược Tây Nam.
                        </p>
                        <p className="text-sm font-semibold pt-4">
                          2. Khi nào tôi có thể nhận được đơn hàng?
                        </p>
                        <p>
                          Dược Tây Nam cam kết giao hàng với thời gian hiển thị
                          trong đơn hàng, sau khi Quý Khách chọn đơn vị vận
                          chuyển được gợi ý cho đơn hàng, tại thời điểm đặt
                          hàng. Quý Khách có thể kiểm tra trạng thái đơn hàng
                          trên Website.
                        </p>
                        <p className="text-sm font-semibold pt-4">
                          3. Phí vận chuyển được tính như thế nào?
                        </p>
                        <p>
                          Dược Tây Nam giao hàng miễn phí cho đơn hàng có giá
                          trị từ 300.000 VNĐ trở lên. Các đơn hàng dưới 300.000đ
                          sẽ phụ thuộc vào:
                        </p>
                        <p className="pl-10">
                          <ul>
                            <li className="list-disc">Đơn vị giao hàng</li>
                            <li className="list-disc">
                              Khoảng cách địa lý giữa địa chỉ nhận hàng và địa
                              chỉ lấy hàng (kho hoặc nhà thuốc Dược Tây Nam)
                            </li>
                            <li className="list-disc">
                              Khối lượng và kích thước đóng gói của các sản phẩm
                              trong đơn hàng
                            </li>
                          </ul>
                        </p>
                        <p>
                          Ngoài ra, Quý Khách có thể hưởng ưu đãi phí giao hàng
                          từ Chính sách hỗ trợ phí vận chuyển hàng tháng của
                          Dược Tây Nam.
                        </p>
                        <p>
                          Tổng giá trị cuối cùng của đơn hàng đã bao gồm phí vận
                          chuyển (nếu có) sẽ được hiển thị trong đơn hàng.
                        </p>
                        <p className="text-sm font-semibold pt-4">
                          4. Dược Tây Nam có giao hàng quốc tế không?
                        </p>
                        <p>
                          Hiện tại Dược Tây Nam chỉ giao hàng trong lãnh thổ
                          Việt Nam và chưa hỗ trợ giao hàng quốc tế.
                        </p>
                        <h4 className="text-lg font-semibold">
                          B. Thông tin giao hàng
                        </h4>
                        <p className="text-sm font-semibold pt-4">
                          1. Tôi có được thông báo trước khi giao hàng không?
                        </p>
                        <p>
                          Đối tác vận chuyển của Dược Tây Nam sẽ liên hệ với quý
                          khách trước khi giao hàng.
                        </p>
                        <p className="text-sm font-semibold pt-4">
                          2. Tôi có thể hẹn thời gian giao hàng được không?
                        </p>
                        <p>
                          Xin vui lòng liên hệ bộ phận chăm sóc khách hàng của
                          Dược Tây Nam để được hỗ trợ tốt nhất.
                        </p>
                        <p className="text-sm font-semibold pt-4">
                          3. Tôi muốn kiểm tra hàng trước khi thanh toán được
                          không?
                        </p>
                        <p>
                          - Trước khi thanh toán cho đơn hàng, quý khách có thể
                          yêu cầu nhân viên giao nhận mở kiện hàng để kiểm tra
                          tình trạng ngoại quan của sản phẩm (không bao gồm việc
                          dùng thử sản phẩm).
                        </p>
                        <p>
                          - Trong trường hợp quý khách không hài lòng với bất kì
                          sản phẩm trong đơn hàng, ngay tại thời điểm được giao
                          hàng, quý khách vui lòng từ chối không nhận toàn bộ
                          kiện hàng hoặc thanh toán toàn bộ giá trị đơn hàng và
                          hoàn trả lại cho bưu tá giao hàng.
                        </p>
                        <p>
                          Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ bộ phận
                          chăm sóc khách hàng của Dược Tây Nam để được hỗ trợ
                          nhanh chóng.
                        </p>
                        <p className="text-sm font-semibold pt-4">
                          4. Nếu giao hàng không thành công, Dược Tây Nam có
                          thông báo cho tôi biết không?
                        </p>
                        <p>
                          Trong trường hợp đơn hàng chưa được giao thành công
                          đến quý khách lần thứ nhất, Dược Tây Nam sẽ liên hệ
                          với quý khách để sắp xếp lại lịch giao hàng.
                        </p>
                        <p>
                          Nếu Dược Tây Nam không thể kết nối được với quý khách
                          hoặc đơn vị vận chuyển không thể giao hàng thành công
                          đến quý khách trong lần giao hàng thứ hai thì đơn hàng
                          sẽ được hủy bởi hệ thống. Dược Tây Nam sẽ giao lại tối
                          đa 3 lần cho một đơn hàng.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          case "chinh-sach-bao-mat":
            return (
              <div id="baomat" className="baomat">
                <div className="bg_body">
                  <div className="container mx-auto py-5 mobile:py-2 tablet:py-3">
                    <div className="leading-7 mobile:px-2 text-justify">
                      <h1 className="font-semibold text-2xl text-center">
                        Chính sách bảo mật
                      </h1>
                      <h4 className="font-semibold text-xl py-3">
                        1. Thông Tin Chung và Sự Chấp Thuận
                      </h4>
                      <p className="pb-5">
                        Chính Sách Quyền Riêng Tư này ("Chính Sách”) mô tả những
                        thông tin cá nhân (là bất kỳ thông tin nào liên quan đến
                        việc xác định danh tính hoặc có thể xác định danh tính
                        một cá nhân cụ thể) (“Thông Tin Cá Nhân”) mà Công Ty Cổ
                        Phần Dược Phẩm Dược Tây Nam (sau đây được gọi là “Dược
                        Tây Nam” hoặc “chúng tôi”) thu thập từ khách hàng
                        ("bạn”) thông qua trang web www.duoctaynam.vn ("Trang
                        Web Dược Tây Nam”) hoặc ứng dụng Dược Tây Nam ("Ứng Dụng
                        Dược Tây Nam”) hoặc thông qua các hình thức khác. Chính
                        Sách này mô tả lý do và cách thức mà chúng tôi sử dụng
                        những thông tin cá nhân đó và những biện pháp mà chúng
                        tôi áp dụng để bảo vệ thông tin cá nhân của bạn. Ngoài
                        ra, bạn sẽ được biết về các quyền của bạn và phương thức
                        liên lạc với chúng tôi.
                      </p>
                      <p className="pb-5">
                        Bằng việc trao cho chúng tôi Thông Tin Cá Nhân của bạn,
                        việc sử dụng Trang Web Dược Tây Nam hoặc Ứng Dụng Dược
                        Tây Nam,bạn đồng ý Thông Tin Cá Nhân của bạn sẽ được thu
                        thập, sử dụng và xử lý như được nêu trong Chính Sách
                        này. Nếu bạn không đồng ý với Chính Sách này, vui lòng
                        không sử dụng Trang Web Dược Tây Nam hoặc Ứng Dụng Dược
                        Tây Nam.
                      </p>
                      <p className="pb-5">
                        Chính Sách này được điều chỉnh bởi và diễm giải theo
                        pháp luật Việt Nam. Dược Tây Nam có thể điều chỉnh Chính
                        Sách này vào từng thời điểm để cập nhật các điều khoản
                        phù hợp với thay đổi của pháp luật Việt Nam và/hoặc với
                        các thay đổi trong hoạt động của chúng tôi. Chúng tôi sẽ
                        thông báo cho bạn biết kịp thời về những thay đổi đối
                        với Chính Sách này để Chính Sách Quyền Riêng Tưđảm bảo
                        bạn biết và thực hiện quyền quản lý Thông Tin Cá Nhân
                        của bạn.
                      </p>
                      <h4 className="font-semibold text-xl py-3">
                        2. Phạm Vi Thu Thập Thông Tin Cá Nhân
                      </h4>
                      <p className="pb-5">
                        Chúng tôi thu thập thông tin, bao gồm Thông Tin Cá Nhân,
                        nhằm mục đích cung cấp dịch vụ tốt hơn cho tất cả Khách
                        Hàng. Thông Tin Cá Nhân mà chúng tôi thu thập từ bạn có
                        thể bao gồm:
                      </p>
                      <p className="pb-5">
                        a. Thông Tin Cá Nhân mà bạn cung cấp cho chúng tôi, bao
                        gồm:
                      </p>
                      <p className="pb-5">
                        <ul className="list-disc pl-8">
                          <li>Tên</li>
                          <li>Giới tính</li>
                          <li>Số điện thoại</li>
                          <li>Ngày sinh</li>
                          <li>Địa chỉ thanh toán và Địa chỉ nhận hàng</li>
                          <li>Đơn hàng, hoá đơn</li>
                          <li>Địa chỉ thư điện tử</li>
                          <li>Thông tin thanh toán.</li>
                        </ul>
                      </p>
                      <p className="pb-5">
                        b. Thông Tin Cá Nhân mà chúng tôi Thu Thập từ bạn:
                      </p>
                      <p className="pb-5">
                        <ul className="list-disc pl-8">
                          <li>
                            Thông Tin về mạng xã hội của bạn khi bạn liên hệ với
                            chúng tôi qua các kênh liên lạc nhằm mục đích cung
                            cấp các nhận xét hoặc đặt ra các câu hỏi;
                          </li>
                          <li>
                            Khi bạn ghé thăm một cửa hàng của chúng tôi, hình
                            ảnh của bạn có thể được ghi lại bởi hệ thống camera
                            an ninh. Chúng tôi đặt thông báo rõ ràng để lưu ý
                            bạn rằng khu vực cửa hàng đang sử dụng camera an
                            ninh;
                          </li>
                          <li>
                            Để đem đến trải nghiệm tốt nhất cho bạn, chúng tôi
                            sử dụng cookies và các công nghệ tương tự để thu
                            thập các thông tin kỹ thuật về máy tính hoặc thiết
                            bị của bạn, kết nối mạng, trình duyệt web cũng như
                            quốc gia, khu vực, địa chỉ IP, những sản phẩm mà bạn
                            xem khi ghé thăm trang web, danh mục tìm kiếm của
                            bạn trên Trang Web Dược Tây Nam mà các thông tin
                            khác về tương tác giữa bạn và Trang Web Dược Tây
                            Nam. Để biết thêm chi tiết về cookies và các công
                            nghệ được sử dụng, vui lòng xem Điều 4 dưới đây.
                          </li>
                        </ul>
                      </p>
                      <p className="pb-5">
                        Nếu bạn cung cấp cho chúng tôi Thông Tin Cá Nhân liên
                        quan đến các cá nhân khác, bạn tuyên bố rằng bạn có đủ
                        thẩm quyền để làm việc đó và thừa nhận rằng Thông Tin Cá
                        Nhân đó sẽ được xử lý tuân theo Chính Sách này.
                      </p>
                      <p className="pb-5">
                        Bạn hiểu rằng một số thông tin trên đây có thể được coi
                        là thông tin cá nhân nhạy cảm theo quy định pháp luật
                        Việt Nam. Bằng việc cung cấp các thông tin này, bạn đồng
                        ý một cách rõ ràmg để chúng tôi xử lý các thông tin nhạy
                        cảm đó cho các mục đích được thể hiện ở Điều 3 dưới đây.
                        Nếu pháp luật có yêu cầu, bạn đồng ý cung cấp một chấp
                        thuận riêng bằng văn bản để chúng tôi xử lý thông tin cá
                        nhân nhạy cảm của bạn.
                      </p>
                      <h4 className="font-semibold text-xl py-3">
                        3. Mục Đích Thu Thập Thông Tin Cá Nhân
                      </h4>
                      <p className="pb-5">
                        Chúng tôi thu thập Thông Tin Cá Nhân chỉ cần thiết nhằm
                        phục vụ cho các mục đích:
                      </p>
                      <p className="pb-5">
                        <ul className="list-disc pl-8">
                          <li>
                            Để xử lý các vấn đề liên quan đến đơn đặt hàng của
                            bạn;để tạo và duy trình tài khoản của bạn với chúng
                            tôi, bao gồm cả các chương trình khách hàng thân
                            thiết hoặc các chương trình thưởng đi kèm với tài
                            khoản của bạn;để phản hồi các yêu cầu, khiếu nại và
                            góp ý của bạn;
                          </li>
                          <li>
                            Để ghi nhận đánh giá của bạn đối với các sản phẩm
                            của chúng tôi;
                          </li>
                          <li>
                            Để thông báo cho bạn khi có trục trặc về đơn hàng
                            của bạn;
                          </li>
                          <li>
                            Để thông báo cho bạn về những thay đổi đối với sản
                            phẩm và dịch vụ của chúng tôi;cho phép chúng tôi
                            phục vụ tốt hơn với sự cá nhân hóa mạnh hơn ở các
                            khía cạnh, bao gồm nhưng không giới hạn: (i) để cải
                            thiện và cá nhân hóa trải nghiệm của bạn trên Trang
                            Web Dược Tây Nam và Ứng Dụng Dược Tây Nam, (ii) để
                            cải thiện các tiện ích, dịch vụ, phù hợp với các nhu
                            cầu được cá thể hóa, và (iii) để phục vụ bạn với
                            những giới thiệu, quảng cáo được điều chỉnh phù hợp
                            với sự quan tâm của bạn;
                          </li>
                          <li>
                            Cho các mục đích ngăn ngừa các hoạt động phá hủy tài
                            khoản người dùng của khách hàng hoặc các hoạt động
                            giả mạo khách hàng;
                          </li>
                          <li>
                            Để chúng tôi thực hiện các quyền và nghĩa vụ theo
                            luật định và theo yêu cầu của cơ quan có thẩm quyền,
                            tùy từng trường hợp; và nhằm mục đích điều tra việc
                            gian lận hoặc vi phạm các Điều Khoản Sử Dụng Trang
                            Web và Ứng Dụng Dược Tây Nam cũng như Chính Sách này
                            hoặc những hành vi gian lận khác.
                          </li>
                        </ul>
                      </p>
                      <h4 className="font-semibold text-xl py-3">
                        4. Cookies và các Công Nghệ Tương Tự
                      </h4>
                      <p className="pb-5">
                        Chúng tôi thu thập Thông Tin Cá Nhân của bạn khi Bạn
                        trực tiếp cung cấp cho chúng tôi. Ngoài ra, chúng tôi sử
                        dụng một số công nghệ để thu thập và lưu trữ thông tin,
                        bao gồm cả thông tin cá nhân, khi bạn truy cập vào hoặc
                        tương tác với Trang Web Dược Tây Nam hoặc Ứng Dụng Dược
                        Tây Nam, ví dụ như cookies hoặc các công nghệ tương tự
                        để xác định trình duyệt hoặc thiết bị của bạn:
                      </p>
                      <p className="pb-5">
                        <ul className="list-disc pl-8">
                          <li>
                            Cookies: Cookies là một tập tin nhỏ được đặt trên ổ
                            cứng của máy tính của bạn. Bạn có thể từ chối nhận
                            cookies từ trình duyệt bằng cách điều chỉnh cài đặt
                            trên trình duyệt của bạn. Thông thường, các trình
                            duyệt mặc định nhận cookies.
                          </li>
                          <li>
                            Web Beacons: Web Beacons là một tập dữ liệu cho phép
                            chúng tôi đếm số lượng truy cập vào Trang Web Dược
                            Tây Nam hoặc tính toán các thông số khác liên quan
                            đến trang web (ví dụ như mức độ phổ biến của một số
                            nội dung, sản phẩm của trang web và để xác nhận tính
                            toàn vẹn của trang web và hệ thống);
                          </li>
                          <li>
                            Clickstream Data: là những thông tin được thu thập
                            bởi hệ thống của chúng tôi khi bạn yêu cầu các trang
                            web từ Trang Web Dược Tây Nam, ví dụ như trang web
                            đích, thời gian bạn ở trên trang web, trình duyệt
                            web, và các thông tin tương tự;
                          </li>
                          <li>
                            API hệ thống trên Ứng Dụng Dược Tây Nam: là những
                            giao diện ứng dụng với mục đích (1) đọc và ghi vào
                            danh bạ điện thoại, (2) ghi nhận vị trí hiện tại của
                            thiết bị của bạn, (3) ghi dữ liệu của ứng dụng lên
                            thiết bị của bạn, và (4) kết nối Internet từ thiết
                            bị của bạn.
                          </li>
                        </ul>
                      </p>
                      <h4 className="font-semibold text-xl py-3">
                        5. Thời Gian Lưu Trữ
                      </h4>
                      <p className="pb-5">
                        Trừ khi pháp luật Việt Nam cho phép hoặc có yêu cầu khác
                        đi, chúng tôi chỉ lưu giữ Thông Tin Cá Nhân của bạn cho
                        đến khi nào việc lưu giữ là cần thiết cho các mục đích
                        mà Thông Tin Cá Nhân được thu thập (bao gồm, cho mục
                        đích đáp ứng bất kỳ nghĩa vụ hoặc yêu cầu pháp luật nào,
                        hoặc các nghĩa vụ và yêu cầu khác đối với việc cung cấp
                        các sản phẩm, dịch vụ cho bạn) và cho việc lưu trữ dữ
                        liệu công nghệ thông tin, nếu có.
                      </p>
                      <p className="pb-5">
                        Bạn có thể tự đăng nhập vào tài khoản của bạn và thực
                        hiện hủy bỏ Thông Tin Cá Nhân về bạn mà chúng tôi đang
                        nắm giữ hoặc gửi một yêu cầu xoá với thông tin liên hệ ở
                        Điều 9 dưới đây.
                      </p>
                      <h4 className="font-semibold text-xl py-3">
                        6. Không Chia Sẻ Thông Tin Cá Nhân Khách Hàng
                      </h4>
                      <p className="pb-5">
                        Chúng tôi sẽ không cung cấp Thông Tin Cá Nhân của bạn
                        cho bất kỳ bên thứ ba nào, trừ một số hoạt động cần
                        thiết dưới đây:
                      </p>
                      <p className="pb-5">
                        Chúng tôi cung cấp Thông Tin Cá Nhân của bạn cho các đối
                        tác là bên cung cấp dịch vụ liên quan đến việc thực hiện
                        đơn hàng của bạn. Thông Tin Cá Nhân chỉ được cung cấp
                        một cách giới hạn trong phạm vi cần thiết, kèm theo yêu
                        cầu bên thứ ba đó phải áp dụng các biên pháp đảm bảo an
                        ninh, bảo mật đối với Thông Tin Cá Nhân;Chúng tôi có thể
                        sử dụng dịch vụ từ một nhà cung cấp dịch vụ là bên thứ
                        ba để thực hiện một số hoạt động liên quan đến Trang Web
                        Dược Tây Nam và Ứng Dụng Dược Tây Nam và khi đó bên thứ
                        ba này có thể truy cập hoặc xử lý các thông tin cá nhân
                        trong quá trình cung cấp các dịch vụ đó. Chúng tôi yêu
                        cầu các bên thứ ba này tuân thủ mọi luật lệ về bảo vệ
                        thông tin cá nhân liên quan và các yêu cầu về an ninh
                        liên quan đến thông tin cá nhân.Chúng tôi có thể cung
                        cấp Dữ Liệu Cá Nhân của bạn khi thực hiện các chương
                        trình có tính liên kết, đồng thực hiện, thuê ngoài cho
                        các mục đích được nêu tại Điều 3;Chúng tôi có thể tiết
                        lộ các Thông Tin Cá Nhân nếu luật pháp yêu cầu hoặc theo
                        yêu cầu hợp lệ của một cơ quan có thẩm quyền; ;Chuyển
                        giao kinh doanh (nếu có): trong trường hợp chúng tôi sáp
                        nhập, hợp nhất toàn bộ hoặc một phần với công ty khác,
                        bên nhận chuyển nhượng sẽ có quyền truy cập thông tin
                        được chúng tôi lưu trữ, duy trì trong đó bao gồm cả
                        thông tin cá nhân;
                      </p>
                      <p className="pb-5">
                        Khi chúng tôi cung cấp Thông Tin Cá Nhân cho các mục
                        đích trên đây, chúng tôi luôn yêu cầu bên nhận thông tin
                        phải bảo mật các Thông Tin Cá Nhân đó và chỉ sử dụng
                        Thông Tin Cá Nhân cho các mục đích đã được thống nhất.
                      </p>
                      <h4 className="font-semibold text-xl py-3">
                        7. An Toàn Dữ Liệu
                      </h4>
                      <p className="pb-5">
                        Thông Tin Cá Nhân của bạn được lưu giữ tại hệ thống máy
                        chủ của chúng tôi ở Việt Nam. Chúng tôi luôn nỗ lực để
                        giữ an toàn Thông Tin Cá Nhân mà chúng tôi nắm giữ.
                        Chúng tôi đã và đang thực hiện nhiều biện pháp an toàn,
                        bao gồm:{" "}
                      </p>
                      <p className="pb-5">
                        Thông Tin Cá Nhân của bạn được lưu giữ tại hệ thống máy
                        chủ của chúng tôi ở Việt Nam. Chúng tôi luôn nỗ lực để
                        giữ an toàn Thông Tin Cá Nhân mà chúng tôi nắm giữ.
                        Chúng tôi đã và đang thực hiện nhiều biện pháp an toàn,
                        bao gồm:
                      </p>
                      <p className="pb-5">
                        Thông Tin Cá Nhân của bạn được lưu giữ tại hệ thống máy
                        chủ của chúng tôi ở Việt Nam. Chúng tôi luôn nỗ lực để
                        giữ an toàn Thông Tin Cá Nhân mà chúng tôi nắm giữ.
                        Chúng tôi đã và đang thực hiện nhiều biện pháp an toàn,
                        bao gồm:
                      </p>
                      <h4 className="font-semibold text-xl py-3">
                        8. Quyền Của Bạn Đối Với Thông Tin Cá Nhân
                      </h4>
                      <p className="font-semibold">
                        Quyền chấp thuận hoặc rút lại chấp thuận xử lý Thông Tin
                        Cá Nhân:
                      </p>
                      <p className="pb-5">
                        <ul className="list-disc pl-8">
                          <li>
                            Bạn có quyền chấp thuận cung cấp thông tin cá nhân
                            cho chúng tôi và có thể thay đổi quyết định đó vào
                            bất cứ lúc nào.
                          </li>
                        </ul>
                      </p>
                      <p className="font-semibold">
                        Quyền yêu cầu truy cập, xoá hoặc sửa chữa Dữ Liệu Cá
                        Nhân:
                      </p>
                      <p className="pb-5">
                        <ul className="list-disc pl-8">
                          <li>
                            Bạn có quyền yêu cầu truy cập vào thông tin mà chúng
                            tôi nắm giữ về bạn. Nếu bạn muốn xem, xác nhận, xoá
                            hoặc sửa chữa Thông Tin Cá Nhân của bạn, bạn có thể
                            thực hiện bằng cách đăng nhập vào tài khoản và chỉnh
                            sửa Thông Tin Cá Nhân hoặc yêu cầu chúng tôi thực
                            hiện việc này.
                          </li>
                          <li>
                            Khi bạn thực hiện một yêu cầu liên quan đến Thông
                            Tin Cá Nhân, lưu ý rằng chúng tôi có thể yêu cầu một
                            số thông tin cụ thể từ bạn (ví dụ như mật khẩu, tên
                            đăng nhập, mã xác nhận OTP, v.v.) để giúp chúng tôi
                            xác nhận danh tính của bạn và quyền truy cập, cũng
                            như để tìm kiếm và cung cấp cho bạn Thông Tin Cá
                            Nhân của bạn mà chúng tôi đang nắm giữ. Trong trường
                            hợp chúng tôi không thể thực hiện yêu cầu của bạn,
                            chúng tôi sẽ thông báo với bạn về lý do bằng văn
                            bản, tuân thủ bất kỳ hạn chế về pháp luật nào.
                          </li>
                          <li>
                            Chúng tôi có trách nhiệm theo quy định pháp luật
                            phải đảm bảo Thông Tin Cá Nhân mà chúng tôi nắm giữ
                            là chính xác, cập nhật và đầy đủ. Nếu bạn tin rằng
                            Dữ Liệu Cá Nhân của bạn là không chính xác, không
                            đầy đủ hoặc đã lỗi thời, bạn có thể yêu cầu Dữ Liệu
                            Cá Nhân của bạn được điều chỉnh hoặc đính chính.
                          </li>
                        </ul>
                      </p>
                      <p className="font-semibold">
                        Quyền hạn chế xử lý thông tin:
                      </p>
                      <p className="pb-5">
                        <ul className="list-disc pl-8">
                          <li>
                            Bạn có quyền yêu cầu chúng tôi (i) dừng việc xử lý
                            Dữ Liệu của bạn, (ii) hạn chế truy cập vào Dữ Liệu
                            Cá Nhân của bạn, và/hoặc (iii) dừng việc cung cấp Dữ
                            Liệu Cá Nhân của bạn cho bất kỳ bên thứ ba nào, trừ
                            khi pháp luật có quy định khác.
                          </li>
                          <li>
                            Các quyền khác theo quy định của pháp luật về bảo vệ
                            dự liệu cá nhân.
                          </li>
                        </ul>
                      </p>
                      <h4 className="font-semibold text-xl py-3">
                        9. Thông Tin Liên Hệ
                      </h4>
                      <p className="pb-5">
                        Nếu bạn có câu hỏi hoặc bất kỳ thắc mắc nào về Chính
                        Sách này hoặc thực tế việc chúng tôi thu thập, quản lý
                        Thông Tin Cá Nhân của bạn, xin vui lòng liên hệ với
                        chúng tôi bằng cách:
                      </p>
                      <p className="pb-5">
                        <ul className="list-disc pl-8">
                          <li>
                            Gọi điện thoại đến hotline: 1800 6821 – Chăm sóc
                            khách hàng
                          </li>
                          <li>
                            Gửi thư điện tử đến địa chỉ email:
                            cskh@duoctaynam.vn
                          </li>
                        </ul>
                      </p>
                      <h4 className="font-semibold text-xl py-3">
                        10. Đơn Vị Thu Thập và Quản Lý Thông Tin
                      </h4>
                      <p className="pb-5">
                        Công ty Cổ phần Dược phẩm Dược Tây Nam
                      </p>
                      <h4 className="font-semibold text-xl py-3">
                        11. Hiệu Lực
                      </h4>
                      <p className="pb-5">
                        Chính Sách Quyền Riêng Tư này có hiệu lực từ 22/04/2022
                      </p>
                      <h4 className="font-semibold text-xl py-3">
                        12. Bản Thay Đổi
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            );
          case "chinh-sach-thanh-toan":
            return (
              <div id="thanhtoan" className="thanhtoan">
                <div className="bg_body">
                  <div className="container mx-auto py-5 mobile:py-2 tablet:py-3">
                    <div className="leading-7 mobile:px-1 whitespace-normal">
                      <h1 className="font-semibold text-2xl text-center">
                        Chính sách thanh toán
                      </h1>
                      <p className="pt-3">● Phương thức thanh toán</p>
                      <p>- Thu hộ qua đơn vị vận chuyển.</p>
                      <p>
                        - Tiền mặt: Tại địa chỉ của khách hàng hoặc tại trụ sở
                        của Công ty.
                      </p>
                      <p>- Chuyển khoản: 0907 0039 0079 (MBBank).</p>
                      <p>
                        ● Chính sách sản phẩm và dịch vụ: Sản phẩm chính hãng
                        theo tiêu chuẩn của nhà sản xuất và dịch vụ chính thức
                        của Dược Tây Nam.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          case "chinh-sach-thanh-vien":
            return (
              <div id="thanhvien" className="thanhvien">
                <div className="bg_body">
                  <div className="container mx-auto py-5 mobile:py-2 tablet:py-3">
                    <div className="leading-7 mobile:px-1 whitespace-normal">
                      <p>Chính sách thành viên</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          default:
            break;
        }
      })()}
    </>
  );
};

export default Footer_item;
