package com.tiendadelcazador.tiendabackend.services;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lowagie.text.Document;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.tiendadelcazador.tiendabackend.entities.Boleta;
import com.tiendadelcazador.tiendabackend.entities.DetallePedido;
import com.tiendadelcazador.tiendabackend.entities.Pedido;
import com.tiendadelcazador.tiendabackend.repositories.BoletaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoletaService {

    private final BoletaRepository boletaRepo;

    @Transactional
    public Boleta generarParaPedido(Pedido pedido) {

        Boleta existente = boletaRepo.findByPedidoId(pedido.getId()).orElse(null);
        if (existente != null) {
            return existente;
        }

        Long totalBruto = pedido.getTotal();
        if (totalBruto == null) totalBruto = 0L;

        double bruto = totalBruto.doubleValue();
        long neto = Math.round(bruto / 1.19);   
        long iva = totalBruto - neto;

        Long maxNumero = boletaRepo.findMaxNumero();
        long siguienteNumero = (maxNumero == null ? 1 : maxNumero + 1);

        Boleta b = new Boleta();
        b.setNumero(siguienteNumero);
        b.setFechaEmision(LocalDateTime.now());
        b.setNeto(neto);
        b.setIva(iva);
        b.setTotal(totalBruto);
        b.setUsuario(pedido.getUsuario());
        b.setPedido(pedido);

        return boletaRepo.save(b);
    }

    // ===========================
    //   GENERAR PDF EN MEMORIA
    // ===========================
    @Transactional(readOnly = true)
    public byte[] generarPdfBoleta(Pedido pedido) {
        Boleta boleta = boletaRepo.findByPedidoId(pedido.getId())
                .orElseThrow(() -> new RuntimeException("Boleta no encontrada para el pedido"));

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4, 36, 36, 36, 36);

        try {
            PdfWriter.getInstance(document, baos);
            document.open();

            Font tituloFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 11);
            Font boldFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11);

            // Título
            Paragraph titulo = new Paragraph("BOLETA ELECTRÓNICA", tituloFont);
            titulo.setAlignment(Element.ALIGN_CENTER);
            document.add(titulo);

            document.add(new Paragraph(" "));

            // Datos boleta
            DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
            Paragraph infoBoleta = new Paragraph();
            infoBoleta.add(new Paragraph("Boleta N°: " + boleta.getNumero(), normalFont));
            infoBoleta.add(new Paragraph("Fecha emisión: " + boleta.getFechaEmision().format(fmt), normalFont));
            infoBoleta.add(new Paragraph("Pedido N°: " + pedido.getId(), normalFont));
            document.add(infoBoleta);

            document.add(new Paragraph(" "));

            // Datos cliente
            var u = boleta.getUsuario();
            Paragraph infoCliente = new Paragraph();
            infoCliente.add(new Paragraph("Cliente: " +
                    (u.getNombre() != null ? u.getNombre() : "") + " " +
                    (u.getApellidos() != null ? u.getApellidos() : ""), normalFont));
            infoCliente.add(new Paragraph("RUT: " + (u.getRut() != null ? u.getRut() : "-"), normalFont));
            infoCliente.add(new Paragraph("Email: " + u.getEmail(), normalFont));
            infoCliente.add(new Paragraph("Dirección: " +
                    (u.getDireccion() != null ? u.getDireccion() : "-"), normalFont));
            document.add(infoCliente);

            document.add(new Paragraph(" "));

            // Tabla de detalles
            PdfPTable table = new PdfPTable(4);
            table.setWidthPercentage(100);
            table.setWidths(new float[]{4f, 1f, 2f, 2f});

            table.addCell(celdaHeader("Producto", boldFont));
            table.addCell(celdaHeader("Cant.", boldFont));
            table.addCell(celdaHeader("P. Unitario", boldFont));
            table.addCell(celdaHeader("Subtotal", boldFont));

            for (DetallePedido det : pedido.getDetalles()) {
                table.addCell(new PdfPCell(new Paragraph(det.getProducto().getNombre(), normalFont)));
                table.addCell(new PdfPCell(new Paragraph(String.valueOf(det.getCantidad()), normalFont)));
                table.addCell(new PdfPCell(new Paragraph(
                        "$" + formatearPesos(det.getPrecioUnitario()), normalFont)));
                long subtotal = det.getPrecioUnitario() * det.getCantidad();
                table.addCell(new PdfPCell(new Paragraph(
                        "$" + formatearPesos(subtotal), normalFont)));
            }

            document.add(table);

            document.add(new Paragraph(" "));

            // Totales
            Paragraph totales = new Paragraph();
            totales.setAlignment(Element.ALIGN_RIGHT);
            totales.add(new Paragraph("Neto: $" + formatearPesos(boleta.getNeto()), boldFont));
            totales.add(new Paragraph("IVA (19%): $" + formatearPesos(boleta.getIva()), boldFont));
            totales.add(new Paragraph("TOTAL: $" + formatearPesos(boleta.getTotal()), boldFont));
            document.add(totales);

            document.close();
            return baos.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Error al generar PDF de boleta", e);
        }
    }

    private PdfPCell celdaHeader(String texto, Font font) {
        PdfPCell cell = new PdfPCell(new Paragraph(texto, font));
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        return cell;
    }

    private String formatearPesos(Long monto) {
        if (monto == null) return "0";
        return String.format("%,d", monto).replace(',', '.');
    }
}

