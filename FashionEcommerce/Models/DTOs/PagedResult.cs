namespace FashionEcommerce.Models.DTOs
{
    /// <summary>
    /// Generic Paged Result - Kết quả phân trang
    /// </summary>
    public class PagedResult<T>
    {
        /// <summary>
        /// Tổng số items
        /// </summary>
        public int TotalItems { get; set; }

        /// <summary>
        /// Tổng số trang
        /// </summary>
        public int TotalPages { get; set; }

        /// <summary>
        /// Chỉ mục trang hiện tại
        /// </summary>
        public int PageIndex { get; set; }

        /// <summary>
        /// Kích thước trang
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        /// Danh sách items
        /// </summary>
        public List<T> Items { get; set; } = new List<T>();

        /// <summary>
        /// Kiểm tra có trang trước không
        /// </summary>
        public bool HasPreviousPage => PageIndex > 1;

        /// <summary>
        /// Kiểm tra có trang sau không
        /// </summary>
        public bool HasNextPage => PageIndex < TotalPages;
    }
}

