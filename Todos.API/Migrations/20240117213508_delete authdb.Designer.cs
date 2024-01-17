﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Todos.API.Data;

#nullable disable

namespace Todos.API.Migrations
{
    [DbContext(typeof(TodosDbContext))]
    [Migration("20240117213508_delete authdb")]
    partial class deleteauthdb
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Todos.API.Models.Domain.Todo", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<DateTime>("Due")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("PriorityId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("StatusId")
                        .HasColumnType("uuid");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("PriorityId");

                    b.HasIndex("StatusId");

                    b.ToTable("Todos");
                });

            modelBuilder.Entity("Todos.API.Priority", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Priorities");

                    b.HasData(
                        new
                        {
                            Id = new Guid("24a11bab-3f79-46d6-b523-105775634dc7"),
                            Name = "Low"
                        },
                        new
                        {
                            Id = new Guid("8e5ab86b-0ff0-45bb-9478-c9f154fec4c1"),
                            Name = "Medium"
                        },
                        new
                        {
                            Id = new Guid("71fcc481-e946-4c76-acca-06a02b540453"),
                            Name = "High"
                        },
                        new
                        {
                            Id = new Guid("7308fad5-ccf2-49ed-bcd5-cf35ac147abf"),
                            Name = "Critical"
                        });
                });

            modelBuilder.Entity("Todos.API.Status", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Statuses");

                    b.HasData(
                        new
                        {
                            Id = new Guid("e1527379-a581-4768-8705-ae332d045cb4"),
                            Name = "Pending"
                        },
                        new
                        {
                            Id = new Guid("4bdcc014-791f-481a-91b5-892bec8d36b3"),
                            Name = "In Progress"
                        },
                        new
                        {
                            Id = new Guid("c4a55655-87b6-4579-9eec-4dc4d011f6b1"),
                            Name = "Done"
                        },
                        new
                        {
                            Id = new Guid("ef97ff6b-2330-4492-b349-1c74e2ef3d12"),
                            Name = "Canceled"
                        });
                });

            modelBuilder.Entity("Todos.API.Models.Domain.Todo", b =>
                {
                    b.HasOne("Todos.API.Priority", "Priority")
                        .WithMany()
                        .HasForeignKey("PriorityId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Todos.API.Status", "Status")
                        .WithMany()
                        .HasForeignKey("StatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Priority");

                    b.Navigation("Status");
                });
#pragma warning restore 612, 618
        }
    }
}
