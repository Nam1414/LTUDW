namespace FashionEcommerce.Models.DTOs
{
    /// <summary>
    /// Product Query Parameters - Parameters cho việc filter và pagination
    /// </summary>
    public class ProductQueryParameters
    {
        /// <summary>
        /// Tìm kiếm theo tên sản phẩm
        /// </summary>
        public string? SearchTerm { get; set; }

        /// <summary>
        /// Lọc theo CategoryId
        /// </summary>
        public int? CategoryId { get; set; }

        /// <summary>
        /// Giá tối thiểu
        /// </summary>
        public decimal? MinPrice { get; set; }

        /// <summary>
        /// Giá tối đa
        /// </summary>
        public decimal? MaxPrice { get; set; }

        /// <summary>
        /// Chỉ mục trang (mặc định = 1)
        /// </summary>
        public int PageIndex { get; set; } = 1;

        /// <summary>
        /// Kích thước trang (mặc định = 10)
        /// </summary>
        public int PageSize { get; set; } = 10;
    }
}

