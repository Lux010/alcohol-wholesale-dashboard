export const GetHeadlineSIMODeals = `
SELECT z.device_basket_id,
    z.tariff_basket_id,
    z.tariff_basket_desc,
    SUM(deal_price_24) as deal_price_24, 
    SUM(deal_price_36) AS deal_price_36,
    z.tariff_sub,
    SUM(deal_simo_rrp_24) AS deal_simo_rrp_24, 
    SUM(deal_simo_rrp_36) AS deal_simo_rrp_36,
    SUM(discount_to_fv_24) AS discount_to_fv_24,
    SUM(discount_to_fv_36) AS discount_to_fv_36,
    z.efficiency,
    z.new_line_volume,
    z.retention_volume,
    z.check_flag
    FROM (
    SELECT  c.device_basket_id,
            c.tariff_basket_id,
            c.tariff_basket_desc,
            CASE
                WHEN term=24
                THEN c.deal_price_curr
                ELSE 0
                END AS deal_price_24,
            CASE
                WHEN term=36
                THEN c.deal_price_curr
                ELSE 0
                END AS deal_price_36,
            c.efficiency,
            c.new_line_volume,
            c.retention_volume,
            c.tariff_sub,
            CASE
                WHEN term=24
                THEN c.deal_simo_rrp
                ELSE 0
                END AS deal_simo_rrp_24,
            CASE
                WHEN term=36
                THEN c.deal_simo_rrp
                ELSE 0
                END AS deal_simo_rrp_36,
            CASE
                WHEN term=24
                THEN c.discount_to_fv
                ELSE 0
                END AS discount_to_fv_24,
            CASE
                WHEN term=36
                THEN c.discount_to_fv
                ELSE 0
                END AS discount_to_fv_36,
            c.deal_price_curr,
            c.deal_price_prev,
            c.check_flag
        FROM enr_headline c 
        WHERE c.cycle_id = ? AND c.simo_indicator = 'Y') z
    GROUP BY 3, 6;`;
