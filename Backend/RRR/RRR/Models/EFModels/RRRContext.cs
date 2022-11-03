using Microsoft.EntityFrameworkCore;

#nullable disable

namespace RRR.Models.EFModels
{
    public partial class RRRContext : DbContext
    {
        public RRRContext()
        {
        }

        public RRRContext(DbContextOptions<RRRContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Consumer> Consumers { get; set; }
        public virtual DbSet<Provider> Providers { get; set; }
        public virtual DbSet<PublicUser> PublicUsers { get; set; }
        public virtual DbSet<Ads> Ads { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                //optionsBuilder.UseSqlServer("Data Source=JAGAN; Initial Catalog=RRR; user id=sa; password=Jagan@#1234");
                optionsBuilder.UseSqlServer("Data Source=P10-LAPTOP-103\\SQLEXPRESS; Initial Catalog=RRR; user id=mms_login; password=people10@2018");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Consumer>(entity =>
            {
                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasColumnType("text");

                entity.Property(e => e.ContactNo).IsRequired();

                entity.Property(e => e.ContactPerson)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Location).IsRequired();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.Password).IsRequired();

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(150);

                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<Provider>(entity =>
            {
                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasColumnType("text");

                entity.Property(e => e.ContactNumber)
                    .IsRequired()
                    .HasMaxLength(15);

                entity.Property(e => e.ContactPerson)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.CreatedDate).HasColumnType("date");

                entity.Property(e => e.Location).IsRequired();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.Password).IsRequired();
            });

            modelBuilder.Entity<PublicUser>(entity =>
            {
                entity.ToTable("Public_Users");

                entity.Property(e => e.Address).HasColumnType("text");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Email).HasMaxLength(250);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(250);

                entity.Property(e => e.LastName).HasMaxLength(250);

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasMaxLength(15);

                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<Ads>(entity =>
            {
                entity.ToTable("Ads");

                entity.Property(e => e.Address).IsRequired().HasColumnType("text");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Name).IsRequired().HasMaxLength(500);

                entity.Property(e => e.Type).IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.ExpiryDate).IsRequired().HasColumnType("datetime");

                entity.Property(e => e.Location).IsRequired();

                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.Property(e => e.Category).IsRequired();

                entity.Property(e => e.AddressType).IsRequired();

                entity.Property(e => e.ContactNumber).IsRequired();

                entity.Property(e => e.ContactName).IsRequired().HasMaxLength(250);

                entity.Property(e => e.Notes).IsRequired();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
